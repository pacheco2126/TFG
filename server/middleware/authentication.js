const jwt = require('jsonwebtoken')
const User = require('../models/user')

function authentication(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization

  //Authoritation está presente?
  if(authHeader?.startsWith('Bearer')) {

    const token = authHeader.split(' ')[1]

    // verificamos con jwt 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if(err){
        req.user = {}
        return next()
      }

      const user = await User.findById(decoded.id).select({ password: 0, refresh_token: 0 }).exec()

      //agregamos a la solicitud HTTP
      if(user){
        req.user = user.toObject({ getters: true })
      }else{ //si token no valido o no presente --> req user vacio
        req.user = {}
      }

      return next()

    })

  }else{
    req.user = {}
    return next()
  }
}

module.exports = authentication