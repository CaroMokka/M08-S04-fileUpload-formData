import express from "express"
import fileUpload from "express-fileupload"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()

const port = 3000

app.use(express.json())
app.use(fileUpload({ createParentPath: true }))
app.use("/public", express.static(`${__dirname}/public`))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
})

app.post("/registro", (req, res) => {
    console.log(req.body)
    console.log(req.files)
    const archivo = req.files.foto
    const filename = uuid()
    const { ext } = path.parse(req.files.foto.name)
    console.log({ext})

    if(archivo.mimetype != "image/jpg" ){

    }
    res.json({ message: "Registro exitoso." })

})

app.listen(port, () => {
    console.log(`Aplicación en ejecución en el puerto ${port}`)
})