require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/routes');


const app = express();
app.use(express.json()); // Para procesar JSON


// Conectar a MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Usar las rutas general
app.use('/api', routes);



// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
