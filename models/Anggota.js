const mongoose = require('mongoose');
const db = require('../config/database');

const Schema = db.Schema;
const anggotaSchema = new Schema(
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
    alamat: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'anggota',
  }
);

module.exports = mongoose.model('Anggota', anggotaSchema);
