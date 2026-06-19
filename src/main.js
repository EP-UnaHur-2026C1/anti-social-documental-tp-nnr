console.log("UnaHur - Anti-Social net");

const express = require("express");
const dotenv = require("dotenv");
const conectarDb = require("./config/db");
const postRoutes = require('./routes/post.routes');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/posts', postRoutes);

conectarDb();

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});