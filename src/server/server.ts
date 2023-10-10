

import express, { Application } from 'express';
import cors from 'cors'

import authRoutes from '../router/authRoutes';
import taskRoutes from '../router/taskRoutes';
import dbConnection from '../database/config';
import { UserAttributes } from '../models/user';


class Server {

   private app: Application;
   private port: number;
   private apiPaths = {
      auth: '/api/auth',
      task: '/api/task'
   }

   constructor() {
      this.app = express();
      this.port = Number(process.env.PORT || 8001);

      // Conectar base de datos
      this.dbConnection();
      // Middlewares
      this.middlewares();
      // Definir rutas   
      this.routes();   
   }

   routes() {

      this.app.use( this.apiPaths.auth, authRoutes);
      this.app.use( this.apiPaths.task, taskRoutes);

   }

   middlewares(){
      // CORS
      this.app.use( cors() );

      // Lectura y parseo del body
      this.app.use( express.json() );

      // Directorio publico
      this.app.use( express.static('./src/public') );
   }

   async dbConnection() {

      await dbConnection();

   }

   listen() {
      this.app.listen( this.port, () => {
          console.log('Servidor TS corriendo en el puerto: ' + this.port );
      });
   }
}

declare global {
   namespace Express {
     interface Request {
       user: UserAttributes
     }
   }
}



export default Server;