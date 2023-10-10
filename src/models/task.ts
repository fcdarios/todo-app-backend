import { Schema, model } from "mongoose";


const TaskSchema = new Schema({
   title: {
      type: String,
      required: [true, 'El título es obligatorio']
   },
   completed: {
      type: Boolean,
      default: false
   },
   createdAt: {
      type: Date,
      required: [true, 'La fecha de creación es obligatoria']
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
});

TaskSchema.methods.toJSON = function() {
   const { __v, ...task  } = this.toObject();
   return task
}

export const TaskModel = model('Task', TaskSchema);