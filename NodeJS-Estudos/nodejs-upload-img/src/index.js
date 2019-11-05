const express = require('express');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');

// Initilizations
const app = express();


// Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename: function (req, file, cb) {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
})
app.use(multer({
    storage: storage,
    dest: path.join(__dirname,'public/uploads'),
    limits: {fileSize: 2000000}, //2mb = 4.000.000
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Arquivo deve ser uma imagem valida!");
    }
}).single('image'));

// Statis files
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use(require('./routes/index.routes'));


// Start the server
app.listen(app.get('port'), function() {
    console.log(`Server on port ${app.get('port')}`);
});