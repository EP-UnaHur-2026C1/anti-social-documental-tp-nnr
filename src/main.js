const dotenv = require("dotenv");

const express = require("express");

const conectarDb = require("./config/db");

dotenv.config();

const commentRoutes = require('./routes/commentRoutes');
//const tagRoutes = require('./routes/tagToutes');

const notFound = require('./middlewares/notFound');


const app = express();

app.use(express.json());

//Rutas
app.use('/comment', commentRoutes);
//app.use('/tag', tagRoutes);

//Middleware de error
app.use(notFound);


const port = process.env.PORT || 3000;

conectarDb();

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.use(notFound);

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});