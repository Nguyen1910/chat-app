module.exports = class FormatError extends Error {
  constructor(status, message) {
    super();
    this.message = message;
    this.status = status;
  }
};
