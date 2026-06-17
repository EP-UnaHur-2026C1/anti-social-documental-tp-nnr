console.log("UnaHur - Anti-Social net");

const express = require("express");
const dotenv = require("dotenv");
const conectarDb = require("./config/db");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const usuarioRoutes = require('./routes/usuario.routes')

app.use(express.json());

conectarDb();

app.use('/', usuarioRoutes)

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});