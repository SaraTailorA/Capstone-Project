import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../../config/database.js';
import { config } from '../../config/env.js';
import { sendSuccess, sendError } from '../../utils/responses.js';

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 'Todos los campos son obligatorios', 400);
    }

    if (password.length < 8) {
      return sendError(res, 'La contraseña debe tener al menos 8 caracteres', 400);
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return sendError(res, 'El email ya está registrado', 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, full_name, email, created_at',
      [name, email, passwordHash]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    sendSuccess(res, {
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
      },
    }, 201);
  } catch (error) {
    sendError(res, error.message);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email y contraseña son obligatorios', 400);
    }

    const result = await query(
      'SELECT id, full_name, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Credenciales incorrectas', 401);
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return sendError(res, 'Credenciales incorrectas', 401);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    sendSuccess(res, {
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    sendError(res, error.message);
  }
}

export async function getProfile(req, res) {
  try {
    const result = await query(
      'SELECT id, full_name, email, phone, avatar_url, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Usuario no encontrado', 404);
    }

    const user = result.rows[0];
    sendSuccess(res, {
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar_url,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    sendError(res, error.message);
  }
}
