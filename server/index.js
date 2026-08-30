const express = require('express');
const cors = require('cors');
const path = require('path');
const gamesRoutes = require('./routes/gamesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del cliente
const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));

// Rutas de la API
app.use('/api', gamesRoutes);

// Healthcheck para Railway
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

// Enrutador SPA: Redirigir cualquier otra petición al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Iniciar Servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=========================================`);
  console.log(`🎮 Plataforma ezze.games iniciada con éxito!`);
  console.log(`🚀 Servidor escuchando en: http://localhost:${PORT}`);
  console.log(`🌐 Listo para producción en Railway`);
  console.log(`=========================================`);
});
