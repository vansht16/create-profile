const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  suburb: { type: String },
  state: { type: String },
  postcode: { type: String }
});

module.exports = mongoose.model('Profile', ProfileSchema);
