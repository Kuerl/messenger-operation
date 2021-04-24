// Testing Register

const express = require('express');
const { sequelize, Accounts } = require('./models');
const { body, validationResult } = require('express-validator');    // register check email and password (client and server must check them both because of secure)
const bodyParser = require('body-parser');                          // get data form from body req

const app = express();
app.use(bodyParser.json());

const Login = require('./services/loginService');
const Register =  require('./services/registerService');

Login.Login(app);
Register.Register(app, body);

// Authen
    // Session id: uuid
    // Cookie => Header => JWT Decode => Authentication...

app.listen(({ port: 5000 }), async () => {
    try {
        console.log('Server start at: http://localhost:5000');
        sequelize.authenticate()
        await sequelize.authenticate({alter: true});
            console.log('Connection has been established successfully.');
    }
    catch (err) {
        console.log(err);
    }
});

// Note: Username and Email must be convert to lowercase before auth and create