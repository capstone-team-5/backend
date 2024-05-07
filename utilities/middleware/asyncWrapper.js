// wrap your asynchronous route handlers. This method handles your errors and ensures that any errors thrown within your async functions are properly caught and passed to the reviewErrorHandler middleware
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  };
};

module.exports = asyncWrapper;
