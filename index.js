import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dbConnection } from './database/config.js';
import { router as auth } from './v1/routes/auth.js';
import { router as events } from './v1/routes/events.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

//Conexión a la base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio Público
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/v1/events', events);
app.use('/api/v1/auth', auth);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
