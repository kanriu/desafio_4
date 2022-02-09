const express = require("express");
const productosRouter = require("./routes/productos");
const homeRouter = require("./routes/home");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/api/productos", productosRouter);
app.use("/", homeRouter);

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
