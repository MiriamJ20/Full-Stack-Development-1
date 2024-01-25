const PublicController = require('../features/public/public.controller');

const registerPublicRoutes = (app) => {
  app.post('/contact', PublicController.contactUs);

  app.get("/calc/:buildingType", PublicController.calcQuote);
};

module.exports = {registerPublicRoutes};