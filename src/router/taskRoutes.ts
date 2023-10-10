import { Router } from "express";
import { check } from "express-validator";

import { getTasks, getTask, postTask, deleteTask, putTask, getTasksAll } from "../controllers/taskController";
import comprobarErroresCampos from "../middlewares/comprobarErroresCampos";
import validarJWT from "../middlewares/validarJWT";

const router = Router();


router.get('/all', getTasksAll);

router.get('/',[
   validarJWT,
   comprobarErroresCampos
], getTasks);

router.get('/:id',[
   validarJWT,
   check('id', 'No es un ID válido').isMongoId(),
   comprobarErroresCampos
], getTask);

router.post('/',[
   validarJWT,
   check('title', 'Es obligatorio el titulo').not().isEmpty(),
   comprobarErroresCampos
], postTask);

router.put('/:id',[
   validarJWT,
   check('id', 'No es un ID válido').isMongoId(),
   comprobarErroresCampos
], putTask);


router.delete('/:id', [
   validarJWT,
   check('id', 'No es un ID válido').isMongoId(),
   comprobarErroresCampos
], deleteTask);

export default router;