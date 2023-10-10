import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';


import { UserModel } from "../models/user";
import generarJWT from "../helpers/generarJWT";







export const auth = async (req: Request, res: Response) => {

   res.json({msg: "Auth"})
}

export const authlogin = async (req: Request, res: Response) => {

   const { email, password } = req.body;

   try {
      // Verificar si el correo existe
      const user = await UserModel.findOne({ email });
      if ( !user ) {
         return res.status(401).json({ errorMessage: "El correo no existe" });
      }

      // Validar si la contraseña es correcta
      const isValidPassword = bcryptjs.compareSync( password, user.password );
      if ( !isValidPassword ) {
         return res.status(401).json({ errorMessage: "El password es incorrecto" });
      }

      // Generar JWT
      const token = await generarJWT( email );
   
      // Regresar usuario y token
      return res.json({ user , token});

   } catch (error) {
      console.log( error );
      return res.status(500).json({
         error: 'Hable con el administrador'
      });
   }

}

export const authRegister = async (req: Request, res: Response) => {

   const { name, email, password } = req.body;
   try {
      // Verificar si el correo existe
      const userAuth = await UserModel.findOne({ email });
      if ( userAuth ) {
         return res.status(400).json({ errorMessage: `El email ya existe` });
      };

      // Encriptar contraseña
      const salt = bcryptjs.genSaltSync();
      const hash = bcryptjs.hashSync( password, salt );

      // Registrar en base de datos
      const user = await UserModel.create({
         name,
         email,
         password: hash
      });

      return res.status(201).json( user );
   } catch (error) {
      console.log( error );
      return res.status(500).json({
         errorMessage: 'Hable con el administrador'
      });
   }
}

export const authCheck = async ( req: Request, res: Response ) => {


   const user = req.user;
   
   // Generar nuevo token
   const token = await generarJWT( user.email );

   res.json({ user, token })

   // const authorization = req.headers.authorization;
   // if ( !authorization ) {
   //    return res.status(400).json({errorMessage: "El token no existe"});
   // }

   // const token = authorization.split(' ')[1];
   // try {
   //    const { email } = jwt.verify( token, process.env.SECRETORPRIVATEKEY as Secret ) as JwtPayload;
      
   //    const user = await UserModel.findOne({ email });

   //    if ( !user ) {
   //       throw new Error("Usuario no encontrado");
   //    }

   //    res.json(user);
   // } catch (error) {
   //    console.log(error);
   //    return res.status(400).json({
   //       msg: 'Token NO valido'
   //    });
   // }
}