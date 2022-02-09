const express = require("express");
const path = require("path");
const Contenedor = require("../clase");
const { Router } = express;

const router = Router();

const filePath = path.join(__dirname, "productos.txt");

const contenedor = new Contenedor(filePath);

router.get("", async (req, res) => {
  res.status(200).send(await contenedor.getAll());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await contenedor.getById(parseInt(id));
  producto
    ? res.status(200).send(producto)
    : res.status(404).send({ error: "producto no encontrado" });
});

router.post("/", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  await contenedor.save({ title, price, thumbnail });
  res.status(201).send("Producto creado");
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  const response = await contenedor.update({ id, title, price, thumbnail });
  response
    ? res.status(202).send("Producto editado")
    : res.status(404).send({ error: "producto no encontrado" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await contenedor.deleteById(parseInt(id));
  response
    ? res.status(202).send("Producto eliminado")
    : res.status(404).send({ error: "producto no encontrado" });
});

module.exports = router;
