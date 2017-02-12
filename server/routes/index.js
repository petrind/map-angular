var origins = require('../controllers/origins'),
  destinations = require('../controllers/destinations');

module.exports = function (router) {

  router.get('/origins', origins.index);
  router.get('/origins/:id', origins.show);
  router.post('/origins', origins.create);
  router.put('/origins/:id', origins.update);
  router.delete('/origins/:id', origins.delete);

  router.get('/destinations', destinations.index);
  router.get('/destinations/:id', destinations.show);
  router.post('/destinations', destinations.create);
  router.put('/destinations/:id', destinations.update);
  router.delete('/destinations/:id', destinations.delete);

  return router
};