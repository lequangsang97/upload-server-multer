const AWS = require('aws-sdk');
const fs = require('fs');
const {accessKey, secretKey} = require('./config');

AWS.config.update({ accessKeyId: accessKey, secretAccessKey: secretKey });

const s3 = new AWS.S3();

fs.readFile(`./dims.jpg`, (err, data) => {
    const objParam = {
        Bucket: 'imagemovies',
        Key: `dims.jpeg`,
        Body: data,
        ACL:'public-read-write',
        ContentType: 'image/jpg'
    }
    console.log(data);
    uploadPromise = new AWS.S3().putObject(objParam).promise().then((rs) => {
        console.log(rs);
    });
})