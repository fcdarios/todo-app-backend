import { Schema, model } from "mongoose";


 // Document interface
 export interface UserAttributes {
   uid:string;
   name: string;
   email: string;
   password: string;
 }

const UserSchema = new Schema<UserAttributes>({
   name: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio']
   },
   email: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      unique: true
   },
   password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
   },
 });

 UserSchema.methods.toJSON = function() {
   const { __v, _id, password, ...user  } = this.toObject();
   user.uid = _id;
   return user
}



export const UserModel = model('User', UserSchema);

