/**
 * Async Handler Utility
 *
 * This utility wraps async controller functions.
 * It catches any errors and passes them to our global
 * error handler via the `next` function.
 * This avoids writing try...catch blocks in every controller.
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Global Error Handler Middleware
 *
 * This catches all errors passed by `next(error)` and sends
 * a formatted JSON response to the client.
 */
export const errorHandler = (err, req, res, next) => {
  // Log the error for the developer
  console.error(err.stack);

  // Set a default status code if one isn't already set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // --- Handle Specific Mongoose Errors ---

  // Mongoose Bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404; // Not Found
    message = 'Resource not found';
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400; // Bad Request
    // Get all validation error messages
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Mongoose Duplicate Key Error (e.g., unique email)
  if (err.code === 11000) {
    statusCode = 400; // Bad Request
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: ${field}. This value already exists.`;
    // Customize for our double-booking index
    if (field === 'slotId' || field === 'email') {
      message = 'You have already registered for this slot with this email address.';
    }
  }

  // Send the error response to the client
  res.status(statusCode).json({
    success: false,
    message: message,
    // Only show stack trace in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
