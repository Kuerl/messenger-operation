const { validationResult } = require('express-validator');    // register check email and password (client and server must check them both because of secure)
const Auth = require('../util/auth');
const { sequelize, Accounts, Varification } = require('../models');
const { Op } = require("sequelize");

module.exports.Register = function(server, body, session) {
    // Get Register
    server.get('/register',  async (req, res) => {
        try {
            res.send('Register Page')
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Err: ', err);
        }
    });

    // Post Register
    server.post('/register', body('email').isEmail(), body('password').isLength({ min: 5 }), async (req,res) => {
        // Register: express-validator: Check isValid email, password
        const validatorErrors = validationResult(req);   // express-validator: Save errors to variable: validatorErrors
        if (!validatorErrors.isEmpty()) {
            return res.status(400).json({ validatorErrors: validatorErrors.array() });
        }
        const { password, firstname, lastname } = req.body;
        console.log( password, firstname, lastname );
        try {
            let checkInfo = await Accounts.findAll({
                where: {
                    [Op.or]: [
                        {user_name: req.body.user_name.toLowerCase()},
                        {email: req.body.email.toLowerCase()}
                    ]
                }
            })
            if(checkInfo.length !== 0) {
                res.json("This username or email is already exist!");
            } else {
                // Create Account
                await Accounts.create({ user_name: req.body.user_name.toLowerCase(), password, email: req.body.email.toLowerCase(), is_active: true, status: "Active", firstname, lastname, block_count: 0, is_block: false });
                res.json('Your account is already created!');
                // Add direct here!
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({"Create account errors: ": err});
        }
    });

    // Auth.Auth(server, session, data);
}