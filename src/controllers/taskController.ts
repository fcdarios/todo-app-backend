import { Request, Response } from "express";
import { TaskModel } from "../models/task";


export const getTasksAll = async ( req: Request, res: Response ) => {

   
   const tasks = await TaskModel.find();

   res.json( tasks );
}

export const getTasks = async ( req: Request, res: Response ) => {

   const { uid } = req.user;
   const tasks = await TaskModel.find( { user: uid} );

   res.json( tasks );
}

export const getTask = async ( req: Request, res: Response ) => {

   const { uid } = req.user;
   const { id } = req.params;

   const task = await TaskModel.findOne({ _id: id, user: uid });

   if ( !task ) {
      return res.status(401).json({msg: "La tarea no existe"});
   }
   return res.json( task );
}

export const putTask = async ( req: Request, res: Response ) => {

   const { uid } = req.user;
   const { id } = req.params;
   const { title, completed } = req.body;

   const task = await TaskModel.findOneAndUpdate({ _id: id, user: uid }, { title, completed }, {new: true});
   if ( !task ) {
      return res.status(401).json({msg: "La tarea no existe"});
   }


   return res.json( task );
}

export const postTask = async ( req: Request, res: Response  ) => {

   const { title } = req.body;
   const { uid } = req.user;

   const createdAt = new Date();
   const dataTask = {
      title,
      createdAt,
      user: uid
   }

   const task = await TaskModel.create( dataTask );

   res.status(201).json( {task} );
}


export const deleteTask = async ( req: Request, res: Response ) => {

   const { uid } = req.user;
   const { id } = req.params;

   const task = await TaskModel.findOneAndDelete({ _id: id, user: uid });

   if ( !task ) {
      return res.status(401).json({msg: "La tarea no existe"});
   }
   res.json({msg: "Tarea eliminada con exito", task});
}
