const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
<<<<<<< HEAD
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
=======
const {accessKey, secretKey} = require('./config');

AWS.config.update({ accessKeyId: accessKey, secretAccessKey: secretKey, region: 'ap-southeast-1' });
//const memoryStorage = multer.memoryStorage;
>>>>>>> 094d4e998a66bb73539ab1a181128de7f38284f6

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
<<<<<<< HEAD
        //console.log(file.originalname.substr(file.originalname.length - 3));
        cb(null, `${new Date().getTime()}.${file.originalname.substr(file.originalname.length - 3)}`);
    }
})
var upload = multer({storage: storage});


app.post('/upload', upload.single('avatar'), (req, res) => {
    console.log(req.body);
    res.json(req.file)
=======
        cb(null, `${new Date().getTime()}.${file.originalname.substr(file.originalname.length - 3)}`);
    }
})
//var upload = multer({storage: storage});
var upload = multer();

app.post('/upload', upload.single('avatar'), (req, res) => {
    //console.log(req.file.buffer);
    //console.log(req.file.originalname)
    const objParam = {
        Bucket: 'imagemovies',
        Key: `${new Date().getTime().toString()}.jpeg`,
        Body: req.file.buffer,
        ACL:'public-read-write',
        ContentType: 'image/jpg'
    }
    
    //console.log(data);
    uploadPromise = new AWS.S3().putObject(objParam).promise().then((rs) => {
        console.log(AWS.config);
        let linkImage = `s3-${AWS.config.region}.amazonaws.com/${objParam.Bucket}/${objParam.Key}`
        res.json({linkImage})
        
    });
    
>>>>>>> 094d4e998a66bb73539ab1a181128de7f38284f6
});
app.listen(port, ()=>console.log(`server running on port: ${port}`));