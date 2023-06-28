const allowedOrigins = require('../config/allowed_origins')

const credentials = (req, res, next) => {
  const origin = req.headers.origin //obtengo el origen de la solicitud

  if(allowedOrigins.includes(origin)){ //verifica si el origen está permitido
    res.header('Access-Control-Allow-Origin', true) //le damos permisos a los recursos
    res.header('Access-Control-Allow-Credentials', true) // credenciales en las solicitudes from client application
  }

  next()
}

module.exports = credentials