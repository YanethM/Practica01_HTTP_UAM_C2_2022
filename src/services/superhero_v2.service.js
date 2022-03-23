const SuperheroModel = require('../models/superhero_v2.model');

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

  async showSuperhero(superheroId) {
    return SuperheroModel.findById({ _id: superheroId });
  }

  async editSuperhero(superheroId, superhero, realname, superpower) {
    return SuperheroModel.findById({ _id: superheroId }).then(
      (superheroFind) => {
        if (!superheroFind) throw Error('No se encontro el superheroe');
        return SuperheroModel.updateOne(
          { superheroId },
          { superhero, realname, superpower }
        );
      }
    );
  }

  async removeSuperhero(superheroId) {
    const superhero_remove = SuperheroModel.findById({ _id: superheroId });
    return SuperheroModel.deleteOne(superhero_remove);
  }
}
module.exports = SuperheroService;
