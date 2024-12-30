const Truck = require('../Models/Truck');

// Crear un Truck
const createTruck = async (req, res) => {
  const { user, year, color, plates } = req.body;
  if (!user || !year || !color || !plates) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si ya existe un Truck con las mismas placas
    const existingTruck = await Truck.findOne({ plates });
    if (existingTruck) {
      return res.status(400).json({ error: 'El Truck con estas placas ya existe' });
    }

    const newTruck = new Truck({ user, year, color, plates });
    await newTruck.save();

    res.status(201).json(newTruck);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Truck' });
  }
};

// Listar todos los Trucks
const listTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find().populate('user', 'email'); // Incluye el email del usuario
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar los Trucks' });
  }
};

// Actualizar un Truck
const updateTruck = async (req, res) => {
  const { id } = req.params;
  const { year, color, plates } = req.body;

  try {
    const updatedTruck = await Truck.findByIdAndUpdate(
      id,
      { year, color, plates },
      { new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
    );

    if (!updatedTruck) {
      return res.status(404).json({ error: 'Truck no encontrado' });
    }

    res.json(updatedTruck);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el Truck' });
  }
};

// Eliminar un Truck
const deleteTruck = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTruck = await Truck.findByIdAndDelete(id);

    if (!deletedTruck) {
      return res.status(404).json({ error: 'Truck no encontrado' });
    }

    res.json({ message: 'Truck eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Truck' });
  }
};

module.exports = { createTruck, listTrucks, updateTruck, deleteTruck };
