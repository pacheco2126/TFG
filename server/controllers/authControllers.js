require('dotenv').config(); // Cargar variables de entorno desde .env
const User = require('../models/user')
const Item = require('../models/item')
const Arquitect = require('../models/arquitect')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function register(req, res){
  //obtengo datos de usuario de la HTTP
  const {username, email, first_name, last_name, password, password_confirm} = req.body

  //comprobamos que existan
  if(!username || !email || !password || !password_confirm || !first_name || !last_name) {
    return res.status(422).json({'message': 'Invalid fields'})
  }

  if(password !== password_confirm) return res.status(422).json({'message': 'Passwords do not match'})

  //miramos que el correo no exista ya
  const userExists = await User.exists({email}).exec()

  if(userExists) return res.sendStatus(409)

  try {
    //hasheamos la psw
    hashedPassword = await bcrypt.hash(password, 10)

    //creamos user en base de datos
    await User.create({email, username, password: hashedPassword, first_name, last_name})

    return res.sendStatus(201)
  } catch (error) {
    return res.status(400).json({message: "Could not register"})
  }
}

async function register_arquitect(req, res){
  //obtengo datos de usuario de la HTTP
  const {username, first_name, email, CV, projects} = req.body

  //miramos que el correo no exista ya

  const arquitectExists = await Arquitect.exists({email}).exec()  

  if(arquitectExists) return res.sendStatus(409)

    //creamos user en base de datos
    try{ 
      await Arquitect.create({username, first_name, email, CV, projects})
      return res.sendStatus(201)}
    catch (error) {
      return res.status(400).json({message: "Could not register"})
    }
   
} 



async function register_item(req, res){
  //obtengo datos de item de la HTTP
  const {id_item, item_name, Usage} = req.body

  //comprobamos que existan
  if(!id_item || !item_name || !Usage) {
    return res.status(422).json({'message': 'Invalid item fields'})
  }

  try {
    //creamos user en base de datos
    await Item.create({id_item, item_name, Usage})

    return res.sendStatus(201)
  } catch (error) {
    return res.status(400).json({message: "Could not register the item"})
  }
}

async function edit_item(req, res){
  //obtengo datos de item de la HTTP
  const {id_item, item_name, Usage} = req.body


  //aqui es el error mirar si esto esta bien, quizas solo sea tema de que ese no es el error.
  //comprobamos que existan
  if(!id_item || !item_name || !Usage) {
    return res.status(422).json({'message': 'Invalid item fields'})
  }

  const item = await Item.findOne({id_item}).exec()

  if(!item) return res.status(401).json({message: "Item is incorrect"})

  // actualizamos los datos del ítem
  item.item_name = item_name
  item.Assigned_to = Usage

  try {
    // guardamos los cambios en la base de datos
    await item.save()
    res.status(200).json({message: 'Item updated successfully'})
  } catch (err) {
    res.status(500).json({message: 'Failed to update item'})
  }
}

async function delete_item(req, res){

  //obtengo datos de item de la HTTP
  const {id_item} = req.body
  console.log("El item a borrar es", id_item)
  try {
    await Item.deleteOne({id_item}).exec()
    res.status(200).json({message: 'Item deleted successfully'})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Failed to delete item'})
  }
}


async function login(req, res){
  const {email, password } = req.body

  if(!email || !password) return res.status(422).json({'message': 'Invalid fields'})
  
  const user = await User.findOne({email}).exec()

  if(!user) return res.status(401).json({message: "Email or password is incorrect"})

  const match = await bcrypt.compare(password, user.password)

  if(!match) return res.status(401).json({message: "Email or password is incorrect"})

  const accessToken = jwt.sign(
    {
      id: user.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1800s'
    }
  )

  const refreshToken = jwt.sign(
    {
      id: user.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d'
    }
  )

  user.refresh_token = refreshToken
  await user.save()

  res.cookie('refresh_token', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})
  res.json({access_token: accessToken})
}

async function logout(req, res){
  const cookies = req.cookies

  if(!cookies.refresh_token) return res.sendStatus(204)

  const refreshToken = cookies.refresh_token
  const user = await User.findOne({refresh_token: refreshToken}).exec()

  if(!user){
    res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
    return res.sendStatus(204)
  }

  user.refresh_token = null
  await user.save()

  res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
  res.sendStatus(204)
}

async function refresh(req, res){
  const cookies = req.cookies
  if(!cookies.refresh_token) return res.sendStatus(401)

  const refreshToken = cookies.refresh_token

  const user = await User.findOne({refresh_token: refreshToken}).exec()

  if(!user) return res.sendStatus(403)

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if(err || user.id !== decoded.id) return res.sendStatus(403)

      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1800s' }
      )

      res.json({access_token: accessToken})
    }
  )
}


async function user(req, res){
  
  const user = req.user

  return res.status(200).json(user)
}

async function item(req, res){
  const items = await Item.find() // Obtener todos los items de la base de datos
  return res.status(200).json(items)
}

async function itemById(req, res){
  const {id} = req.params
  const item = await Item.findById({ _id: id });
  return res.status(200).json(item)
}


module.exports = {register, register_item,  register_arquitect ,edit_item, delete_item,login, logout, refresh, user, item, itemById}
