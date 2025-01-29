import { Router } from 'express';
import { check } from 'express-validator';
import * as controller from '../controllers/auth.js';
import { validarCampos } from '../../middlewares/validar-campos.js';
import { validarJWT } from '../../middlewares/validar-jwt.js';
export const router = Router();

/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ],
  controller.crearUsuario,
);
router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ],
  controller.loginUsuario,
);
router.get('/renew', validarJWT, controller.revalidarToken);
