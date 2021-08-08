const mongoose = require('mongoose');
const db = require('../config/database');

const Schema = db.Schema;
const PetugasSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    nama: {
      type: String,
    },
    email: {
      type: String,
      index: {
        unique: true,
      },
    },
  },
  {
    timestamps: true,
    collection: 'petugas',
  }
);

module.exports = mongoose.model('Petugas', PetugasSchema);
