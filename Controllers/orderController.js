// controllers/orderController.js
const Order = require('../Models/Order');

// Crear una nueva orden
exports.createOrder = async (req, res) => {
    try {
      const { user, truck, pickup, dropoff } = req.body;
  
      // Convertir las cadenas a ObjectId usando mongoose.Types.ObjectId
      const newOrder = new Order({
        user: mongoose.Types.ObjectId(user),
        truck: mongoose.Types.ObjectId(truck),
        pickup: mongoose.Types.ObjectId(pickup),
        dropoff: mongoose.Types.ObjectId(dropoff)
      });
  
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error creando la orden', error });
    }
  };

// Obtener todas las órdenes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user truck pickup dropoff');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo las órdenes', error });
  }
};

// Obtener una orden por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user truck pickup dropoff');
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo la orden', error });
  }
};

// Actualizar el estatus de la orden
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando el estatus', error });
  }
};

// Eliminar una orden
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }
    res.status(200).json({ message: 'Orden eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando la orden', error });
  }
};
