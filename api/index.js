const { initializeApp } = require('../backend/server');

let appPromise;

module.exports = async (req, res) => {
  appPromise ||= initializeApp();
  const app = await appPromise;
  return app(req, res);
};