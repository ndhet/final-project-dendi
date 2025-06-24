const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { syncDatabase } = require('./models');     
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

connectDB();
syncDatabase();

const allowedOrigins = [
  'http://localhost:5173',
  'https://penjualan.goprofit.id'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'Kebijakan CORS untuk situs ini tidak mengizinkan akses dari Origin yang ditentukan.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Terjadi kesalahan server!');
});

module.exports = app;
