import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";



const app = express();

// Conectar la base de datos
db.authenticate()
  .then(() => console.log("Bd conectada"))
  .catch((error) => console.log(error));

// definir puerto
const port = process.env.PORT || 3000;

// Habilitar pug
app.set("view engine", "pug");
app.set("view cache", false);
// obtener el año actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombresitio = "Agencia de Viajes";
  next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}))

// definir la carpeta publica

app.use(express.static("public"));

// agregar router
app.use("/", router);

app.listen(port, () => {
  console.log(`El Servidor esta funcionando en el puerto ${port}`);
});
