// Middleware para asegurar que el usuario que realiza una solicitud HTTP está autenticado

function auth(req, res, next){
    if(req.user?.id) return next()
  
    return res.sendStatus(401)
  }
  
  module.exports = auth