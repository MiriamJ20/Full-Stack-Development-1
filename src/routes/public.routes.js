const PublicController = require('../features/public/public.controller');

const registerPublicRoutes = (app) => {
  app.post('/contact', PublicController.contactUs);

  app.get('/calc', PublicController.calc);
};

module.exports = {registerPublicRoutes};