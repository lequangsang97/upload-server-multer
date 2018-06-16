const express = require('express');
const multer = require('multer');
const port = process.env.PORT || 3000;

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
        cb(null,Date.now()+file.originalname);
    }
})
var upload = multer({storage: storage});


app.post('/upload', upload.single('avatar'), (req, res) => {
    console.log(req.file);
    res.json(req.file)
});
app.listen(port, ()=>console.log(`server running on port: ${port}`));