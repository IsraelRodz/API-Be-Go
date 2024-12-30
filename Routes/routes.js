// Routes/routes.js
const express = require('express');
const userController = require('../Controllers/userController');
const truckController = require('../Controllers/truckController');
const orderController = require('../Controllers/orderController');
const locationController = require('../Controllers/locationController');

const router = express.Router();

// Rutas de usuario
router.post('/registrar', userController.registrar);
router.post('/login', userController.login);

// Rutas de Trucks
router.post('/crear-truck', truckController.createTruck); // Crear un Truck
router.get('/listar-trucks', truckController.listTrucks); // Listar todos los Trucks
router.put('/actualizar-truck/:id', truckController.updateTruck); // Corregir typo
router.delete('/eliminar-truck/:id', truckController.deleteTruck); // Eliminar un Truck por ID


//rutas orden
router.post('/orders', orderController.createOrder);// Ruta para crear una nueva orden
router.get('/orders', orderController.getAllOrders);// Ruta para obtener todas las órdenes
router.get('/orders/:id', orderController.getOrderById);// Ruta para obtener una orden por ID
router.put('/orders/:id/status', orderController.updateOrderStatus);// Ruta para actualizar el estatus de la orden
router.delete('/orders/:id', orderController.deleteOrder);// Ruta para eliminar una orden

//rutas para locacion
router.post('/crear-locacion', locationController.createLocation);//Ruta para crear una nueva locacion
router.get('/locacion', locationController.getLocations);// Ruta para obtener todas las locaciones
router.get('/locacion/:id', locationController.getLocationById);// Ruta para obtener locaciones por id
router.put('/locacion/:id', locationController.updateLocation);// Ruta para actualizar el estatus de la locacion
router.delete('/locacion/:id', locationController.deleteLocation);// Ruta para eliminar una locacion

module.exports = router;

