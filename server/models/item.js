const mongoose = require('mongoose');

// Definición del esquema de usuario
const Schema = mongoose.Schema

const ItemSchema = Schema(
  {
    id_item: {
    type: String,
    required: true, 
    unique: true,

  },

  item_name: {
    type: String,
    required: true,
  },

  Usage: {
    type: String,
    required:true
  },

});

//esta es la base de datos y su nombre
module.exports = mongoose.model('Item', ItemSchema)
