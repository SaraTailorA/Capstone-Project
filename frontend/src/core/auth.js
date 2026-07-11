import { storage } from './storage.js';
import { emit } from './eventBus.js';
import { http } from './http.js';

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
  const data = await http.post('/auth/login', { email, password });

  storage.set('token', data.token);
  storage.set('user', data.user);
  currentUser = data.user;
  emit('auth:login', currentUser);
  return currentUser;
}

export async function register(name, email, password) {
  const data = await http.post('/auth/register', { name, email, password });

  storage.set('token', data.token);
  storage.set('user', data.user);
  currentUser = data.user;
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
