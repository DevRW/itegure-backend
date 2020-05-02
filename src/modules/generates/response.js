export class Response {
  /**
   *
   * @param {res, status, data}
   * response happens when the action performed well
   */
  successResponse({ res, status, data }) {
    return res.status(status).json({ result: data });
  }
  /**
   *
   * @param {res, status, data}
   * response happens when there is an error status of 400, 404, 409 etc
   */
  errorResponse({ res, status, data }) {
    return res.status(status).json({ error: data });
  }
  /**
   *
   * @param error string
   *  return serverError object
   */
  serverError(error) {
    return {
      serverError: error,
    };
  }
  /**
   *
   * @param error string
   *  return notFoundError object
   */
  notFoundError(error) {
    return {
      notFound: error,
    };
  }
  /**
   *
   * @param error
   *  return validationError object
   */
  validationError(error) {
    return {
      validationError: error,
    };
  }
  /**
   *
   * @param {msg, param}
   */
  customValidationMessage({ msg, param }) {
    return this.validationError([{ msg, param }]);
  }
  /**
   *
   * @param {message} message
   * return unauthorized message
   */
  authError(message) {
    return {
      unauthorized: message,
    };
  }
}

export default new Response();
