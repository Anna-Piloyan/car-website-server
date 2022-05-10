const express = require('express')
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require('cors') // для корс доменних запитыв
const usersRouter = require('./routes/usersRouter')
const carsRouter = require('./routes/carsRouter')
const app = express()

const path = require('path')
app.use(express.static(path.join(__dirname, 'public/uploads')))
const PORT = 8000;


app.use(cors({
    origin: 'http://localhost:4200',
}))
const storageConfig = multer.diskStorage({

    destination: (req, file, cb) => {
        console.log(file)
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jfif") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

//app.use(express.static("public"));
//app.use('/uploads', express.static('uploads'));
//imageUpload=multer({ storage: storageConfig, fileFilter: fileFilter });
app.use(express.static(__dirname + "/public/"));
const upload = multer({ dest: "public/uploads/", storage: storageConfig, fileFilter: fileFilter });
app.post("/upload", upload.single("image"), function (req, res, next) {
   // console.log("UPLOAD SERVER")
    let filedata = req.filename;
   // console.log(filedata)
    if (!filedata)
        return res.send("Ошибка при загрузке файла");
    else
        return res.send("Файл загружен");
});

app.use('/api/auth', usersRouter)
app.use('/api/cars', carsRouter)

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

mongoose.connect("mongodb://localhost:27017/usersdb", { useUnifiedTopology: true }, function (err) {
    if (err) return console.log(err);
    app.listen(PORT, function () {
        console.log("Сервер ожидает подключения...");
    });
});










