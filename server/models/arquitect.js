const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArquitectSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
        message: 'Invalid email format',
      },
    },
    first_name: {
      type: String,
      required: true,
    },
    CV: {
      data: Buffer,
      contentType: {
        type: String,
        validate: {
          validator: (val) => val === 'application/pdf',
          message: 'Invalid CV format. Only PDF files are allowed.',
        },
      },
    },
    projects: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Arquitect', ArquitectSchema);
