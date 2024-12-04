import express from "express";
import fileUpload from "express-fileupload";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(fileUpload({ createParentPath: true }));
app.use("/public", express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});
app.post("/registro", async (req, res) => {
  if (req.files) {

    const filename = uuidv4();
    const archivo = req.files.foto;
    const { ext } = path.parse(req.files.foto.name);

    if (archivo.size > 5_000_000) {
      return res.status(422).json({ mesagge: "El archivo excede los 5MB" });
    }
    if (
      archivo.mimetype != "image/png" &&
      archivo.mimetype != "image/jpg" &&
      archivo.mimetype != "image/jpeg"
    ) {
      return res
        .status(422)
        .json({ mesagge: "Acepta archivos png, jpg o jpeg." });
    }
    await archivo.mv(`${__dirname}/public/images/${filename}${ext}`)
  }

  res.json({ message: "Registro exitoso" });
});

app.listen(port, () => {
  console.log(`Aplicación en ejecución en el puerto ${port}`);
});
