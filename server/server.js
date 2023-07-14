// Importar módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/cors')
const cookieParser = require('cookie-parser')
const authenticationMiddleware = require('./middleware/authentication')
const credentials = require('./middleware/credentials')
const errorHandlerMiddleware = require('./middleware/error_handler')
const path = require('path');
var paypal = require('paypal-rest-sdk');
var fs = require('fs');


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
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos', err));

// Definir las rutas de la aplicación
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

//rutas del usuario
app.use('/api/auth', require('./rutas/api/auth'));


var ITEMS_FILE = path.join(__dirname, 'items.json');
let itemsData = null;

app.use('/', express.static(__dirname));




// start payment process
app.post('/checkout' , (req , res) => {
  console.log(req.body);
  var execute_payment_json = {
    "payer_id": req.body.data.payerID,
  };
  const payment = {};
  payment.amount = req.body.data.amount;
  const paymentID = req.body.data.paymentID;
  paymentPaypal(paymentID, execute_payment_json, payment,(err, result) => {
      if(err) {
        res.statuts(400).json(JSON.stringify(err));
      } else {
        res.status(200).json(payment);
      }
  });
});

//default error handler
app.use(errorHandlerMiddleware)


// Configurar el puerto y empezar a escuchar las solicitudes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

// helper functions
var paymentPaypal = (paymentID, execute_payment_json, payment, cb) => {
  paypal.payment.execute(paymentID, execute_payment_json,(error, paymentLog) => {
      if (error)
      {
          return cb(error);
      }
      else
      {
          // the server logic after successful payment
          // here just print out the payment information to the console
          payment.email = paymentLog.payer.payer_info.email;
          payment.first_name = paymentLog.payer.payer_info.first_name;
          payment.last_name = paymentLog.payer.payer_info.last_name;
          console.log(payment);
          cb(null, JSON.stringify(payment));
     }
  });
}

app.get('/api/items', function(req, res) {
  fs.readFile(ITEMS_FILE, function(err, data) {
      if (err) {
          console.error(err);
          process.exit(1);
      }
      itemsData = JSON.parse(data);
      res.json(itemsData);
  });
});

app.get('/api/item/:id', function(req, res) {

  const item = itemsData.find(item => item.id === req.params.id);
      if (item) {
          res.json(item);
      } else {
          res.status(404).json({ error: 'Item not found' });
      }

});
