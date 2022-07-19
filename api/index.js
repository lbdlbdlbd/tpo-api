//Express
const express = require("express");
const path = require("path");

//Instancio servidor
const app = express();


//Importo rutas
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

//ENV
const dotenv = require("dotenv");
dotenv.config();


const multer = require("multer");
const bodyParser = require('body-parser');


//Engine Setup
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use("/images", express.static(path.join(__dirname, "/images")));

//Conexion DB
const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify:true,
        //useCreateIndex: true
    })
    
.then(console.log("Conectado a MongoDB"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Se subió el archivo");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", ()=>{
    console.log("Backend is running!");
});