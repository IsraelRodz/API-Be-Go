// models/order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Aquí se refiere a la colección de usuarios
    required: true
  },
  truck: {
    type: Schema.Types.ObjectId,
    ref: 'Truck', // Aquí se refiere a la colección de camiones
    required: true
  },
  status: {
    type: String,
    enum: ['created', 'in transit', 'completed'],
    default: 'created'
  },
  pickup: {
    type: Schema.Types.ObjectId,
    ref: 'Location', // Referencia a la colección de ubicaciones
    required: true
  },
  dropoff: {
    type: Schema.Types.ObjectId,
    ref: 'Location', // Referencia a la colección de ubicaciones
    required: true
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
