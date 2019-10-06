const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//  importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3000); //verifica porta do servidor
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev')); //retorna get, rota (GET / 404 3.845 ms - 139).
app.use(myConnection(mysql, {
    host: 'localhost',
    user : 'root',
    password: '',
    database: 'crudnodejsmysql'
}, 'single'));

app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);

// statics files
app.use(express.static(path.join(__dirname, 'public')));

//  starting the server
app.listen(app.get('port'), () => {
    console.log('servidor localhost:3000')
});