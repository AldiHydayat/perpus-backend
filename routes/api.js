const express = require('express');
const dir = require('../dir');
const router = express.Router();
const controller = require('../controller/index');
const path = require('path');
const key = require('../config/key');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const saveFile = upload.single('cover');

router.get('/petugas', controller.petugas.getPetugas);

router.get('/petugas/anggota', controller.petugas.getAnggota);

router.get('/petugas/buku', controller.petugas.getBuku);

router.get('/image/:fileName', (req, res) => {
  const file = `${dir}/public/images/${req.params.fileName}`;
  res.sendFile(file, (err) => {
    if (err) {
      res.status(404).json({
        message: 'Image not found',
      });
    }
  });
});

router.post('/petugas', controller.petugas.tambahPetugas);

router.delete('/petugas/:id', controller.petugas.hapusPetugas);

router.post('/petugas/anggota', controller.petugas.tambahAnggota);

router.put('/petugas/anggota/:id', controller.petugas.editAnggota);

router.delete('/petugas/anggota/:id', controller.petugas.hapusAnggota);

router.post('/petugas/buku', upload.single('cover'), controller.petugas.tambahBuku);

router.put('/petugas/buku/:id', function (req, res) {
  saveFile(req, res, function (err) {
    if (err) {
      res.status(400).json({
        success: false,
        message: 'Upload file gagal',
      });
    }
    controller.petugas.editBuku(req, res);
  });
});

router.get('/petugas/pinjam', controller.petugas.getPinjam);

router.delete('/petugas/buku/:id', controller.petugas.hapusBuku);

router.post('/petugas/pinjam', controller.petugas.pinjamBuku);

router.put('/petugas/pinjam/:id', controller.petugas.updatePinjam);

module.exports = router;
