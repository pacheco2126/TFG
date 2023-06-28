// Importar módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/cors')
const cookieParser = require('cookie-parser')
const authenticationMiddleware = require('./middleware/authentication')
const credentials = require('./middleware/credentials')
const errorHandlerMiddleware = require('./middleware/error_handler')


// Configurar la aplicación de Express
const app = express();

//Allow credentials
app.use(credentials)

//cors
app.use(cors(corsOptions));

// application.x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//aplication /json response
app.use(express.json());


// middleware for cookies
app.use(cookieParser())

app.use(authenticationMiddleware)


// Conectar a la base de datos de MongoDB
// to hide warnings we use that additional fields
mongoose.connect('mongodb+srv://joaquimpacheco:Andorra3000@clustertfg.0buwu8b.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos', err));

// Definir las rutas de la aplicación
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

//rutas del usuario
app.use('/api/auth', require('./rutas/api/auth'));



//default error handler
app.use(errorHandlerMiddleware)


// Configurar el puerto y empezar a escuchar las solicitudes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

