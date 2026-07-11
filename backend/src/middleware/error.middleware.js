export function errorMiddleware(err, req, res, next) {
  console.error('Error:', err.message);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'UnauthorizedError' || err.message === 'Token inválido') {
    return res.status(401).json({ message: 'No autorizado' });
  }

  if (err.code === '23505') {
    return res.status(409).json({ message: 'Registro duplicado' });
  }

  if (err.code === '23503') {
    return res.status(400).json({ message: 'Referencia no encontrada' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
  });
}
