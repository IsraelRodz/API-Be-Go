const axios = require('axios');
const Location = require('../models/location.model');

// Función para obtener detalles de un lugar usando Google Maps API
const getPlaceDetails = async (place_id) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    const data = response.data.result;

    return {
      address: data.formatted_address,
      latitude: data.geometry.location.lat,
      longitude: data.geometry.location.lng,
    };
  } catch (error) {
    throw new Error('Error al obtener los detalles del lugar');
  }
};

// Crear una nueva Location
const createLocation = async (req, res) => {
  const { place_id } = req.body;

  try {
    // Verifica si el lugar ya está registrado
    const existingLocation = await Location.findOne({ place_id });
    if (existingLocation) {
      return res.status(400).json({ message: 'Este lugar ya está registrado.' });
    }

    // Obtener detalles del lugar usando la API de Google Maps
    const placeDetails = await getPlaceDetails(place_id);

    // Crear la Location
    const newLocation = new Location({
      address: placeDetails.address,
      place_id,
      latitude: placeDetails.latitude,
      longitude: placeDetails.longitude,
    });

    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar todas las Locations
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener Location por ID
const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: 'Location no encontrada' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una Location
const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { place_id } = req.body;
  
  try {
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: 'Location no encontrada' });
    }

    // Obtener detalles del lugar usando la API de Google Maps
    const placeDetails = await getPlaceDetails(place_id);

    location.address = placeDetails.address;
    location.latitude = placeDetails.latitude;
    location.longitude = placeDetails.longitude;
    
    await location.save();
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una Location
const deleteLocation = async (req, res) => {
  const { id } = req.params;
  
  try {
    const location = await Location.findByIdAndDelete(id);
    if (!location) {
      return res.status(404).json({ message: 'Location no encontrada' });
    }
    res.status(200).json({ message: 'Location eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
