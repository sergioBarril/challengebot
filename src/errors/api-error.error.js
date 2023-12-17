module.exports = class ApiError extends Error {
  /**
   * Create an API error
   *
   * @param {number} statusCode
   * @param {string} message
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
};
