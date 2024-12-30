const mongoose = require('mongoose');

// Esquema del usuario
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
