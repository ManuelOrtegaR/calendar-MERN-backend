import { Router } from 'express';
import { check } from 'express-validator';
import { validarJWT } from '../../middlewares/validar-jwt.js';
import { validarCampos } from '../../middlewares/validar-campos.js';
import {
  actualizarEvento,
  crearEvento,
  eliminarEvento,
  getEvento,
  getEventos,
} from '../controllers/events.js';
import { isDate } from '../../helpers/isDate.js';

export const router = Router();

/*
  Rutas de Eventos
  host + /api/events/
*/
router.use(validarJWT);

router.get('/', getEventos);
router.get('/:id', getEvento);
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
  ],
  crearEvento,
);
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
  ],
  actualizarEvento,
);
router.delete('/:id', eliminarEvento);
