const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for unauthorized access error(checkPermissions method)
  if (message === 'UnauthorizedAccess') {
    message = 'Not authorized to access this route';
    statusCode = 401;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🎂' : err.stack,
  });
};

export { notFound, errorHandler };
