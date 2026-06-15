const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const conectarDb = require("./config/db");

const tagRoutes = require('./routes/tagToutes');
const notFound = require('./middlewares/notFound');

const app = express();

app.use(express.json());

// Rutas
app.use('/tag', tagRoutes);

//Middleware de error
app.use(notFound);

const port = process.env.PORT || 3000;

conectarDb();

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});