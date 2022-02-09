const multer = require("multer");
const path = require("path");
const express = require("express");
const Contenedor = require("../clase");
const { Router } = express;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/img"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage });
const router = new Router();

const filePath = path.join(__dirname, "productos.txt");

const contenedor = new Contenedor(filePath);

router.get("/productos", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post("/productos", upload.single("thumbnail"), async (req, res) => {
  const thumbnail = req.file.originalname;
  const { title, price } = req.body;
  await contenedor.save({ title, price, thumbnail });
  res.status(201).send("Producto creado");
});

module.exports = router;
