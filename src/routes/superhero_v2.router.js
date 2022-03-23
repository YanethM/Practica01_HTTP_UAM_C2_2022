const express = require('express');
const SuperheroService = require('../services/superhero_v2.service');
const superheroModel = require('../models/superhero_v2.model');
const superheroV2Router = express.Router();
const service = new SuperheroService();

/* //////////////////////////////////Endpoints////////////////////////////////// */
/* JSON status code
201: Created
200: Lists, put, delete
302: Found
304: Not modified
404: Not found */

superheroV2Router.post('/superhero', async (req, res) => {
  const superheroV2 = superheroModel(req.body);
  await service
    .createSuperhero(superheroV2)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

superheroV2Router.get('/', async (req, res) => {
  await service
    .listSuperheroes()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

superheroV2Router.get('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  await service
    .showSuperhero(superheroId)
    .then((data) => res.status(302).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

superheroV2Router.put('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  const { superhero, realname, superpower } = req.body;
  await service
    .editSuperhero(superheroId, superhero, realname, superpower)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(304).json({ message: err }));
});

superheroV2Router.delete('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  await service
    .removeSuperhero(superheroId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

module.exports = superheroV2Router;
