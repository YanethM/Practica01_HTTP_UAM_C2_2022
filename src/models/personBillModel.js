const mongoose = require('mongoose');
const personBillSchema = mongoose.Schema({
  name: { type: String, require: true },
  lastname: { type: String, require: true },
  dni: { type: String, require: true, unique: true },
  address: {
    type: Object,
    require: true,
    city: { type: String, require: true },
    code_zip: { type: Number, require: true },
    geo: { type: Array, require: true },
  },
});
module.exports = mongoose.model('PersonBillCollection', personBillSchema);
