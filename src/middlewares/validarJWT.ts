import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { UserModel } from "../models/user";



const validarJWT = async (req: Request, res: Response, next: NextFunction) => {

   const token = req.header('x-token');

   if (!token) {
      return res.status(401).json({
         errorMessage: 'El x-token NO existe'
      });
   };

   try {
      const { email } = jwt.verify( token, process.env.SECRETORPRIVATEKEY as Secret ) as JwtPayload;
      
      const userToken = await UserModel.findOne({ email });

      if ( !userToken ) {
         throw new Error("Usuario no encontrado");
      }

      req.user = userToken.toJSON();

      next();
   } catch (error) {
      console.log(error);
      return res.status(401).json({
         msg: 'Token NO valido'
      });
   }
}


export default validarJWT;