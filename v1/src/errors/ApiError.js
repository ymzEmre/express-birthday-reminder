class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.status = statusCode;
  }
  static notFound() {
    this.message = 'There is no such record';
    this.status = 404;
  }
  static badData() {}
}

module.exports = ApiError;
