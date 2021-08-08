const model = {};
const Petugas = require('./Petugas');
const Anggota = require('./Anggota');
const Buku = require('./Buku');
const Peminjaman = require('./Peminjaman');

model.petugas = Petugas;
model.anggota = Anggota;
model.buku = Buku;
model.peminjaman = Peminjaman;

module.exports = model;
