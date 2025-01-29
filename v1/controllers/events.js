import { response } from 'express';
import Evento from '../../models/Evento.js';

export const getEventos = async (req, res = response) => {
  try {
    const eventos = await Evento.find().populate('user', 'name');
    res.json({
      ok: true,
      eventos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

export const getEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  try {
    const eventoDB = await Evento.findById(eventoId);
    if (!eventoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe en la base de datos',
      });
    }
    const evento = await Evento.findById(eventoId).populate('user', 'name');
    res.json({
      ok: true,
      evento,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

export const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);
  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      msg: 'crearEvento',
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

export const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  try {
    const evento = req.body;
    evento.user = req.uid;
    const eventoDB = await Evento.findById(eventoId);
    if (!eventoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe en la base de datos',
      });
    }
    if (eventoDB.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento',
      });
    }
    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, evento, {
      new: true,
    });
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

export const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  try {
    const eventoDB = await Evento.findById(eventoId);
    if (!eventoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe en la base de datos',
      });
    }
    if (eventoDB.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de eliminar este evento',
      });
    }
    await Evento.findByIdAndDelete(eventoId);
    res.json({
      ok: true,
      msg: 'Evento eliminado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};
