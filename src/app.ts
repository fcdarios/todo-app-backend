

import dotenv from 'dotenv';
import Server from './server/server';

// Configurar .ENV
dotenv.config();

// Iniciar el servidor
const server = new Server();
server.listen(); 