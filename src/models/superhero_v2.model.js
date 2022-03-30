const mongoose = require('mongoose');
const superhero_v2Schema = mongoose.Schema({
  superhero: {
    type: String,
    require: true,
    unique: true,
  },
  realname: {
    type: String,
    require: true,
  },
  superpower: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Superhero_v2_Collection', superhero_v2Schema);
