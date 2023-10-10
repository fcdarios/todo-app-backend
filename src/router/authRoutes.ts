import { Router } from "express";
import { check } from "express-validator";



import { auth, authCheck, authRegister, authlogin } from "../controllers/authController";
import comprobarErroresCampos from "../middlewares/comprobarErroresCampos";
import validarJWT from "../middlewares/validarJWT";



const router = Router();


/**
 * Rutas para la autenticación
 */

router.get('/', auth);


router.post('/login',[
   check('email','El email es obligatorio').isEmail(),
   check('password', 'El password es obligatorio').not().isEmpty(),
   comprobarErroresCampos
], authlogin);

router.post('/register',[
   check('email','El email es obligatorio').isEmail(),
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   check('password', 'El password es obligatorio').not().isEmpty(),
   comprobarErroresCampos
],authRegister);

router.get('/check',[
   validarJWT,
   comprobarErroresCampos
], authCheck);




export default router;