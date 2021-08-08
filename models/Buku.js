const mongoose = require('mongoose');
const db = require('../config/database');

const Schema = db.Schema;
const bukuSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    judul: {
      type: String,
    },
    cover: {
      type: String,
      index: {
        unique: true,
      },
    },
    penerbit: {
      type: String,
    },
    kategori: {
      type: String,
    },
    stok: {
      type: Number,
    },
  },
  {
    timestamps: true,
    collection: 'buku',
  }
);

module.exports = mongoose.model('Buku', bukuSchema);
