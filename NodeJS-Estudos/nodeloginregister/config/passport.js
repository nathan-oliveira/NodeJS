var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE '+ dbconfig.database);

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function(id, done) {
        connection.query("SELEC * FROM users WHERE id= ?", [id], function(err, rows) {
            done(err, rows[0]);
        })
    })

    passport.use('local-signup',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        }, function (req, username, password, done) {
            connection.query("SELECT * FROM users WHERE username = ? ", [username], function(err, rows) {
                if(err)
                    return done(err);
                if(rows.length) {
                    return done(null, false, req.flash('signupMessage', 'Isso já é um token'));
                } else {
                    var newUserMySQL = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)
                    };

                    var insertQuery = "INSERT INTO users (username, password) values (?, ?)";

                    connection.query(insertQuery, [newUserMySQL.username, newUserMySQL.password], function(err, rows) {
                        newUserMySQL.id = rows.insertId;

                        return done(null, newUserMySQL);
                    });
                }
            });
        })
    );

    passport.use('local-login',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        }, function(req, username, password, done) {
            connection.query("SELECT * FROM users WHERE username = ? ", [username]), function(err, rows) {
                if(err)
                    return done(err);
                if(!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Nenhum usuário encontrado'));
                }
                if(!crypto.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Senha incorreta'));
                
                return done(null, rows[0]);
            };
        })
    );
};