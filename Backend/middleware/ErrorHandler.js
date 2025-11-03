export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);


export const errorHandler = (err, req, res, next) => {
 
  console.error(err.stack);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404; 
    message = 'Resource not found';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400; 
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: ${field}. This value already exists.`;
    if (field === 'slotId' || field === 'email') {
      message = 'You have already registered for this slot with this email address.';
    }
  }

  res.status(statusCode).json({
    success: false,
    message: message,
   
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
