const petugas = {};
const model = require('../models/index');
const fs = require('fs');

petugas.getPetugas = async (req, res) => {
  try {
    const dataPetugas = await model.petugas.find({}, 'nama email');
    res.status(200).json({
      data: dataPetugas,
    });
  } catch (error) {
    console.log(error);
  }
};

petugas.tambahPetugas = async (req, res) => {
    const body = req.body;
    const validation = {};

    if(!body.nama)
    {
      validation.nama = "nama tidak boleh kosong"
    }

    if(!body.email){
      validation.email = "email tidak boleh kosong"
    }

    if(Object.keys(validation).length > 0)
    {
      res.status(400).json({
        success: false,
        error: validation
      })
    } else {
      await model.petugas.insertMany(
      [
        {
          nama: body.nama,
          email: body.email,
        },
      ],
      (err) => {
        if (err) {
          if ((err.code = 11000)) {
            res.status(403).json({
              message: 'Email sudah terdaftar',
            });
          }
        } else {
            res.status(200).json({
            message: 'Success',
          });
        }
      }
    );
    }
};

petugas.hapusPetugas = async (req, res) => {
  const id = req.params.id;
  await model.petugas.findByIdAndDelete(id, (err, doc) => {
    if (err && err.path == '_id') {
      res.status(403).json({
        message: 'Delete failed!',
      });
    } else {
      res.json({
        message: 'success',
      });
    }
  });
};

petugas.getAnggota = async (req, res) => {
  await model.anggota.find({}).then((result) => {
    res.status(200).json({
      data: result,
    });
  });
};

petugas.tambahAnggota = async (req, res) => {
  const body = req.body;
  const validation = {};

  if (!body.nama) {
    validation.nama = "nama tidak boleh kosong"
  }
    if (!body.email) {
      validation.email ="email tidak boleh kosong"
    }
      if (!body.alamat) {
     validation.alamat = "alamat tidak boleh kosong"
   }

   if(Object.keys(validation).length > 0)
   {
    res.status(400).json({
      success: false,
      error: validation
    })
   } else {
    await model.anggota.insertMany(
    [
      {
        nama: body.nama,
        email: body.email,
        alamat: body.alamat,
      },
    ],
    (err) => {
      if (err) {
        if ((err.code = 11000)) {
          res.status(403).json({
            message: 'Email sudah terdaftar',
          });
        }
      }
      else {
        res.status(200).json({
          message: 'Success',
        });
      }
    }
  );
  }
  
};

petugas.editAnggota = async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  await model.anggota.findByIdAndUpdate(
    id,
    {
      $set: {
        nama: body.nama,
        alamat: body.alamat,
      },
    },
    (err, doc) => {
      if (err !== null && err.path == '_id') {
        res.status(404).json({
          message: 'ID tidak ditemukan',
        });
      }
      if (!err) {
        res.json({
          message: 'success',
        });
      }
    }
  );
};

petugas.hapusAnggota = async (req, res) => {
  const id = req.params.id;
  await model.anggota.findByIdAndDelete(id, (err, doc) => {
    if (err && err.path == '_id') {
      res.status(403).json({
        message: 'Delete failed!',
      });
    } else {
      res.json({
        message: 'success',
      });
    }
  });
};

petugas.getBuku = async (req, res) => {
  const body = req.body;
  await model.buku.find({}).then((result) => {
    res.json({
      data: result,
    });
  });
};

petugas.tambahBuku = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;
    const validation = {};

    if (!body.judul) {
      validation.judul = 'judul tidak boleh kosong';
    }

    if (!body.penerbit) {
      validation.penerbit = 'penerbit tidak boleh kosong';
    }

    if (!body.kategori) {
      validation.kategori = 'kategori tidak boleh kosong';
    }

    if (!body.stok) {
      vaidation.stok = 'stok tidak boleh kosong';
    }

    if (!file) {
      validation.stok = 'Cover required!';
    }

    if (Object.keys(validation).length > 0) {
      fs.unlinkSync('public/images/' + req.file.filename);
      res.status(400).json({
        success: false,
        error: validation,
      });
    } else {
      await model.buku.insertMany(
        [
          {
            judul: body.judul,
            cover: req.file.filename,
            penerbit: body.penerbit,
            kategori: body.kategori,
            stok: body.stok,
          },
        ],
        (err) => {
          if (err) {
            fs.unlinkSync('public/images/' + req.file.filename);
            res.json({
              message: 'Insert gagal',
            });
          } else {
            res.json({
              message: 'success',
            });
          }
        }
      );
    }
  } catch (error) {
    res.status(422).json({
      message: 'Cover invalid!',
    });
  }
};

petugas.editBuku = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const validation = {};

  if (!body.judul) {
    validation.judul = 'judul tidak boleh kosong';
  }

  if (!body.penerbit) {
    validation.penerbit = 'penerbit tidak boleh kosong';
  }

  if (!body.kategori) {
    validation.kategori = 'kategori tidak boleh kosong';
  }

  if (!body.stok) {
    vaidation.stok = 'stok tidak boleh kosong';
  }

  if (Object.keys(validation).length > 0) {
    fs.unlinkSync('public/images/' + req.file.filename);
    res.status(400).json({
      success: false,
      error: validation,
    });
  } else {
    let set = {};

    if (req.file) {
      set = {
        judul: body.judul,
        cover: req.file.filename,
        penerbit: body.penerbit,
        kategori: body.kategori,
        stok: body.stok,
      };

      const data = await model.buku.findOne({ _id: id });
      fs.unlinkSync('public/images/' + data.cover);
    } else {
      set = {
        judul: body.judul,
        penerbit: body.penerbit,
        kategori: body.kategori,
        stok: body.stok,
      };
    }

    await model.buku.findByIdAndUpdate(
      id,
      {
        $set: set,
      },
      (err, doc) => {
        if (err && err.path == '_id') {
          res.status(404).json({
            message: 'Buku tidak ditemukan!',
          });
        } else if (!err) {
          res.status(200).json({
            message: 'success',
          });
        }
      }
    );
  }
};

petugas.hapusBuku = async (req, res) => {
  const id = req.params.id;

  await model.buku.findByIdAndDelete(id, (err, doc) => {
    if (err && err.path == '_id') {
      res.status(403).json({
        message: 'Delete failed!',
      });
    } else {
      res.json({
        message: 'success',
      });
    }
  });
};

petugas.getPinjam = async (req, res) => {
  await model.peminjaman.find({}).then((result) => {
    res.status(200).json({
      data: result,
    });
  });
};

petugas.pinjamBuku = async (req, res) => {
  const body = req.body;
  const validation = {};

  if (!body.idAnggota) {
    validation.idAnggota = 'anggota tidak boleh kosong!';
  }

  if (!body.idBuku) {
    validation.idBuku = 'buku tidak boleh kosong!';
  }

  if (!body.jumlah) {
    validation.jumlah = 'jumlah tidak boleh kosong!';
  }

  if (Object.keys(validation).length > 0) {
    res.status(400).json({
      success: false,
      error: validation,
    });
  } else {
    try {
      const anggota = await model.anggota.findOne({ _id: body.idAnggota });
      const buku = await model.buku.findOne({ _id: body.idBuku });
      const currentDate = new Date();

      await model.peminjaman.insertMany(
        [
          {
            anggota: {
              _id: anggota._id,
              nama: anggota.nama,
            },
            buku: {
              _id: buku._id,
              judul: buku.judul,
            },
            jumlah: body.jumlah,
            tanggalPinjam: currentDate.toLocaleDateString(),
            tanggalKembali: null,
          },
        ],
        async (err) => {
          if (err) {
            res.json({
              message: 'Insert gagal',
            });
          } else {
            await model.buku.findByIdAndUpdate(
              buku._id,
              [
                {
                  $set: {
                    stok: buku.stok - body.jumlah,
                  },
                },
              ],
              (err) => {
                if (err) {
                  throw err;
                }
              }
            );
            res.json({
              message: 'success',
            });
          }
        }
      );
    } catch (err) {
      throw err;
    }
  }
};

petugas.updatePinjam = async (req, res) => {
  const id = req.params.id;
  const currentDate = new Date();

  const peminjaman = await model.peminjaman.findOne({ _id: id });
  const buku = await model.buku.findOne({ _id: peminjaman.buku._id });
  await model.peminjaman.findByIdAndUpdate(
    id,
    {
      $set: {
        tanggalKembali: currentDate.toLocaleDateString(),
      },
    },
    async (err, doc) => {
      if (err && err.path == '_id') {
        res.status(404).json({
          message: 'Peminjaman tidak ditemukan!',
        });
      } else if (!err) {
        await model.buku.findByIdAndUpdate(
          buku.id,
          {
            $set: {
              stok: buku.stok + peminjaman.jumlah,
            },
          },
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
        res.status(200).json({
          message: 'success',
        });
      }
    }
  );
};

module.exports = petugas;
