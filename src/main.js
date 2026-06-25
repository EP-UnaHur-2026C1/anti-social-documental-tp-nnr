
const dotenv = require("dotenv");

const express = require("express");

const conectarDb = require("./config/db");

const swaggerUi = require('swagger-ui-express')
const {swaggerSpec} = require('./docs/swagger')

dotenv.config();

//Importar Rutas
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const tagRoutes = require('./routes/tag.routes');
const usuarioRoutes = require('./routes/usuario.routes')

const notFound = require('./middlewares/notFound');


const app = express();
const port = process.env.PORT || 3000;

conectarDb();

app.use(express.json());


//Rutas
app.use('/api/comment', commentRoutes);
app.use('/api/tag', tagRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', usuarioRoutes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


//Middleware de error
app.use(notFound);

//Swagger

app.listen(port, () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`);
});