const express = require('express');
const personBillRouter = require('./peopleBill.router');
const superheroRouter = require('./superheroes.router');

function routerApi(app) {
  const router = express.Router();
  /* Endpoint estático: http://localhost:5000/api/v1 */
  app.use('/api/v1', router);
  /* Endpoint estático: http://localhost:5000/api/v1/people */
  router.use('/people', personBillRouter);
  /* Endpoint estático: http://localhost:5000/api/v1/superheroes */
  router.use('/superheroes', superheroRouter);
}

module.exports = routerApi;
