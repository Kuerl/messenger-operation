const express = require('express');
const session = require('express-session');
const { sequelize, Accounts } = require('./src/models');
const { body, validationResult } = require('express-validator');    // register check email and password (client and server must check them both because of secure)
const bodyParser = require('body-parser');                          // get data form from body req
var cookieParser = require('cookie-parser');
var path = require('path');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'src/public')));

const Login = require('./src/services/loginService');
const Register =  require('./src/services/registerService');

Login.Login(app, body, urlencodedParser);
Register.Register(app, body, session);

// Sesion: Define
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'Secret Token', 
    cookie: { maxAge: 60000 }
    })
);

// Authen
    // Session id: uuid
    // Cookie => Header => JWT Decode => Authentication...
    

// Server: Listen define
const server = app.listen(5000,  "127.0.0.1", async function () {
    const host = server.address().address
    const port = server.address().port
    try {
        await sequelize.authenticate({alter: true});
            console.log('Connection has been established successfully.');
        console.log("Server start at: http://%s:%s", host, port)
    }
    catch (err) {
        console.log(err);
    }
});

// Note: Username and Email must be convert to lowercase before auth and create