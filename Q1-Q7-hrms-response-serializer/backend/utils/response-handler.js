const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500
  };
  
  const ERROR_MESSAGES = {
    BAD_REQUEST: 'Bad Request',
    UNAUTHORIZED: 'Unauthorized',
    INTERNAL_SERVER_ERROR: 'Internal Server Error'
  };
  
  const bindRequestParams = (req) => {
    return {
      body: req.body || {},
      params: req.params || {},
      query: req.query || {},
      headers: req.headers || {}
    };
  };
  
  const formatResponse = (success, data = null, message = '') => {
    return {
        success,
        message,
      data,
    };
  };
  
  // Response handler middleware
  const responseHandler = (req, res, next) => {
    req.allParams = bindRequestParams(req);
  
    // Success response
    res.success = (data, message = 'Success') => {
      const response = formatResponse(true, data, message);
      return res.status(HTTP_STATUS.OK).json(response);
    };
  
    // Error response
    res.badRequest = (message = ERROR_MESSAGES.BAD_REQUEST) => {
      const response = formatResponse(false, null, message);
      return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
    };
  
    res.unauthorized = (message = ERROR_MESSAGES.UNAUTHORIZED) => {
      const response = formatResponse(false, null, message);
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
    };
  
    res.internalError = (message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR) => {
      const response = formatResponse(false, null, message);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
    };
  
    next();
  };
  
  export default responseHandler;