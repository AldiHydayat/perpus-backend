const mongoose = require('mongoose');
const db = require('../config/database');

const Schema = db.Schema;
const PeminjamanSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    anggota: {
      type: Object,
    },
    buku: {
      type: Object,
    },
    jumlah: {
      type: Number,
    },
    tanggalPinjam: {
      type: Date,
    },
    tanggalKembali: {
      Type: Date,
    },
  },
  {
    timestamps: true,
    collection: 'peminjaman',
  }
);

module.exports = mongoose.model('Peminjaman', PeminjamanSchema);
