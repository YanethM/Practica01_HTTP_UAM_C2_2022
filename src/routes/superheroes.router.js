const express = require('express');
const superhero_routes = express.Router();
const superheroSchema = require('../models/superheroModel');

/* POST: http://localhost:5000/api/v1/superheroes/superhero */
superhero_routes.post('/superhero', (req, res) => {
  const superhero = superheroSchema(req.body);
  superhero
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/* GET:  http://localhost:5000/api/v1/superheroes*/
superhero_routes.get('/', (req, res) => {
  superheroSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/* GET{:id}:  http://localhost:5000/api/v1/superheroes/superheroId */
superhero_routes.get('/:superheroId', (req, res) => {
  const { superheroId } = req.params;
  superheroSchema
    .findById(superheroId)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/* PUT{:id}: http://localhost:5000/api/v1/superheroes/superheroId */
superhero_routes.put('/:superheroId', (req, res) => {
  const { superheroId } = req.params;
  const {
    superhero,
    real_name,
    feature = { universe, super_powers },
    superhero_sidekick = { sidekick, side_powers },
  } = req.body;
  superheroSchema
    .updateOne(
      { _id: superheroId },
      { superhero, real_name, feature, superhero_sidekick }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/* DELETE{:id}: http://localhost:5000/api/v1/superheroes/superheroId */
superhero_routes.delete('/:superheroId', (req, res) => {
  const { superheroId } = req.params;
  superheroSchema
    .remove({ _id: superheroId })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = superhero_routes;
