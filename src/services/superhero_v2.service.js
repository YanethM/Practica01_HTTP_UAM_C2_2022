const SuperheroModel = require('../models/superhero_v2.model');
const Boom = require('@hapi/boom');

class SuperheroService {
  /* Promesas y funciones asincronicas
  Una función asincronica devuelve una promesa
  JS es un lenguaje subproceso (un hilo) -> sólo hace una cosa a la vez*/
  async createSuperhero(superheroV2) {
    superheroV2.save();
    return superheroV2;
  }

  async listSuperheroes() {
    return SuperheroModel.find();
  }

  /* Función que nos devuelve una promesa */
  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SuperheroModel.find());
      }, 3000);
    });
  }

  async showSuperhero(superheroId) {
    return SuperheroModel.findById({ _id: superheroId }).then(
      (superheroFind) => {
        if (!superheroFind) throw Boom.notFound('No se encontro el superheroe');
        return superheroFind;
      }
    );
  }

  async editSuperhero(superheroId, superhero, realname, superpower) {
    return SuperheroModel.findById({ _id: superheroId }).then(
      (superheroFind) => {
        if (!superheroFind) throw Boom.notFound('No se encontro el superheroe');
        return SuperheroModel.updateOne(
          { superheroId },
          { superhero, realname, superpower }
        );
      }
    );
  }

  async removeSuperhero(superheroId) {
    return SuperheroModel.findById({ _id: superheroId }).then(
      (superheroFind) => {
        if (!superheroFind) throw Boom.notFound('No se encontro el superheroe');
        return SuperheroModel.deleteOne(superheroFind);
      }
    );
  }
}

module.exports = SuperheroService;
