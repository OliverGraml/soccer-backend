import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import ClubRoutes from './routes/club.routes.js';
import PlayerRoutes from './routes/player.routes.js';
/* import Player from './models/player.model.js'; */

// datenbank auf den Server ansprechen, ansonsten eine Ersatzdatenbank ansprechen
dotenv.config();

const connectionString =
  process.env.DB_CONNECTION || 'mongodb://localhost:27017/soccer-backend';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.set('returnOriginal', false);

const server = express();

server.use(cors());
server.use(express.json());

server.use(ClubRoutes);
server.use(PlayerRoutes);

server.get('/', (req, res) =>
  res.json({
    status: 'Server is running.',
  })
);

server.listen(5000);
