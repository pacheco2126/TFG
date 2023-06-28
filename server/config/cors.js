const allowedOrigins = require('./allowed_origins')

//to allow the origins to sned request and receive response from user
const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.includes(origin) || !origin){ //checking if origin exist inside allowed origins array
      callback(null, true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = corsOptions