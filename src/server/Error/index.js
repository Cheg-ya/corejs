class ServerError extends Error {
  constructor(message) {
    super();
    this.status = 500;
    this.message = message || 500;
  }
}

module.exports = {
  ServerError
};
