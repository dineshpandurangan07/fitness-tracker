const { initializeApp } = require('../backend/server');

let appPromise;

module.exports = async (req, res) => {
  const app = require('../backend/server').app;

  if (req.url === '/api/health' || req.url.startsWith('/api/health?')) {
    return app(req, res);
  }

  try {
    appPromise ||= initializeApp();
    await appPromise;
    return app(req, res);
  } catch (error) {
    console.error('Vercel API initialization failed:', error.message);
    return res.status(503).json({
      success: false,
      message: 'API is unavailable. Configure a valid MONGO_URI in Vercel.',
    });
  }
};