// Testing Register

const express = require('express');
const { sequelize, Accounts } = require('./models');
const { body, validationResult } = require('express-validator');    // register check email and password (client and server must check them both because of secure)
const bodyParser = require('body-parser');                          // get data form from body req

const app = express();
app.use(bodyParser.json());

// Register
app.get('/register',  async (req, res) => {
    try {
        res.send('Register Page')
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Err: ', err);
    }
});

app.post('/register', body('email').isEmail(), body('password').isLength({ min: 5 }), async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { password, firstname, lastname } = req.body;
    try {
        // Check Username
        let username = await Accounts.findOne({
            where: {
                user_name: req.body.user_name.toLowerCase()
            }
        });
            if (username !== null) {
                res.json("This username is already exist!");
            }
        // Check Mail
        let mail = await Accounts.findOne({
            where: {
                email: req.body.email.toLowerCase()
            }
        });
            if (mail !== null) {
                res.json("This email is already exist!");
            }
        // Create Account
        await Accounts.create({ user_name: req.body.user_name.toLowerCase(), password, email: req.body.email.toLowerCase(), is_active: true, status: "Active", firstname, lastname, block_count: 0, is_block: false });
        res.json('Your account is already created!');
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error: ', err);
    }
});

// Login
app.get('/login', async (req, res) => {
    try {
        res.send('Login Page')
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Err: ', err);
    }
})

app.post('/login', async (req, res) => {
    try {
        let username = await Accounts.findOne({
            where: {
                user_name: req.body.user_name.toLowerCase(),
                password: req.body.password
            }
        });
            if (username !== null) {
                res.json("Your was login successfully!");
            }
            else {
                res.json("Your username or password is incorrect!");
            }
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error: ', err);
    }
})

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