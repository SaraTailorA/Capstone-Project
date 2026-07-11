export function sendSuccess(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    ...data,
  });
}

export function sendError(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

export function paginate(query, page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  return {
    limit: parseInt(limit),
    offset: parseInt(offset),
    page: parseInt(page),
  };
}
