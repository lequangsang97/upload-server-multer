const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

const port = process.env.PORT || 8000;

const app = express();
app.get('/', (req, res) => {
    res.send('le quang sang');
});

// configure upload
var storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './upload');
    },
    filename: (req, file, cb) => {
        //console.log(file.originalname.substr(file.originalname.length - 3));
        cb(null, `${new Date().getTime()}.${file.originalname.substr(file.originalname.length - 3)}`);
    }
})
var upload = multer({storage: storage});


app.post('/upload', upload.single('avatar'), (req, res) => {
    console.log(req.body);
    res.json(req.file)
});
app.listen(port, ()=>console.log(`server running on port: ${port}`));