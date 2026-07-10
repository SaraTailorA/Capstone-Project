import { storage } from './storage.js';
import { emit } from './eventBus.js';

let currentUser = null;

export function initAuth() {
  currentUser = storage.get('user');
}

export function getToken() {
  return storage.get('token');
}

export function isAuthenticated() {
  return !!getToken() && !!currentUser;
}

export function getUser() {
  return currentUser;
}

export async function login(email, password) {
  const users = storage.get('users') || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Credenciales incorrectas');
  }

  const token = 'mock_jwt_' + btoa(user.email + Date.now());
  storage.set('token', token);
  storage.set('user', { id: user.id, name: user.name, email: user.email });
  currentUser = storage.get('user');
  emit('auth:login', currentUser);
  return currentUser;
}

export async function register(name, email, password) {
  const users = storage.get('users') || [];

  if (users.find((u) => u.email === email)) {
    throw new Error('El email ya está registrado');
  }

  const newUser = {
    id: 'user_' + Date.now(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  storage.set('users', users);

  const token = 'mock_jwt_' + btoa(email + Date.now());
  storage.set('token', token);
  storage.set('user', { id: newUser.id, name: newUser.name, email: newUser.email });
  currentUser = storage.get('user');
  emit('auth:login', currentUser);
  return currentUser;
}

export function logout() {
  storage.remove('token');
  storage.remove('user');
  currentUser = null;
  emit('auth:logout');
}

export function updateUser(data) {
  const user = { ...currentUser, ...data };
  storage.set('user', user);
  currentUser = user;
  emit('auth:update', currentUser);
  return currentUser;
}
