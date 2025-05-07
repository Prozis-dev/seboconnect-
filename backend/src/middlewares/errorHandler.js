const errorHandler = (err, req, res, next) => {
  console.error('\x1b[31m', '⚠️ Erro:', err.stack);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    return res.status(400).json({ error: errors.join(', ') });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Token inválido' });
  }

  res.status(500).json({
    error: 'Erro interno do servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

export default errorHandler;