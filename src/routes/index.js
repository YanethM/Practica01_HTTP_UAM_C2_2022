const express = require('express');
const personBillRouter = require('./peopleBill.router');
const superheroRouter = require('./superheroes.router');
const superheroRouterV2 = require('../routes/superhero_v2.router');

function routerApi(app) {
  const router = express.Router();
  /* Endpoint estático: http://localhost:5000/api/v1 */
  app.use('/api/v1', router);
  /* Endpoint estático: http://localhost:5000/api/v1/people */
  router.use('/people', personBillRouter);
  /* Endpoint estático: http://localhost:5000/api/v1/superheroes */
  router.use('/superheroes', superheroRouter);
  /* Endpoint estático: http://localhost:5000/api/v1/superheroes_v2 */
  router.use('/superheroes_v2', superheroRouterV2);
}

module.exports = routerApi;
