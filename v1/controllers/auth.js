import { response } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../../models/Usuario.js';
import { generarJWT } from '../../helpers/jwt.js';

export const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        message: 'Un usuario ya existe con ese correo',
      });
    }
    const newUsuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    newUsuario.password = bcrypt.hashSync(password, salt);
    await newUsuario.save();
    const token = await generarJWT(newUsuario.id, newUsuario.name);
    res.status(201).json({
      ok: true,
      message: 'Usuario creado exitosamente!',
      uid: newUsuario.id,
      name: newUsuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: 'Por favor hable con el administrador' });
  }
};

export const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        message: 'El usuario no existe con ese email',
      });
    }
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Contraseña incorrecta',
      });
    }
    const token = await generarJWT(usuario.id, usuario.name);
    res.json({
      ok: true,
      message: 'Logear',
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: 'Por favor hable con el administrador' });
  }
};

export const revalidarToken = async (req, res = response) => {
  const token = await generarJWT(req.uid, req.name);
  res.json({
    ok: true,
    token,
  });
};
