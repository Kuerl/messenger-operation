import {body, validationResult} from 'express-validator';    // register check email and password (client and server must check them both because of secure)
import {Accounts} from '../models';
import { Op } from "sequelize";
import path from 'path';
import {CreateAccount} from '../util/creator';

const register = (server, bodyParser) => {
    // Get Register
    server.get('/register', bodyParser, async (req, res) => {
        try {
            res.sendFile(path.join(__dirname, '../public/html/register.html'));
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Err: ', err);
        }
    });

    // Post Register
    server.post('/register', bodyParser, body('email').isEmail(), body('password').isLength({ min: 6, max: 18 }), async (req,res) => {
        // Register: express-validator: Check isValid email, password
        const validatorErrors = validationResult(req);   // express-validator: Save errors to variable: validatorErrors
        console.log(req.body);
        console.log(validatorErrors.array());
        if (!validatorErrors.isEmpty()) {
            res.setHeader('validatorErrors', validatorErrors.array());
            res.redirect('/register');
        }
        const { password, firstname, lastname } = req.body;
        console.log(req.body);
        try {
            let checkInfo = await Accounts.findAll({
                where: {
                    [Op.or]: [
                        {username: req.body.username.toLowerCase()},
                        {email: req.body.email.toLowerCase()}
                    ]
                }
            })
            if(checkInfo.length !== 0) {
                console.log('Check INFOR: ', checkInfo);
                res.setHeader('registerStatus', 'Exist');
                res.redirect('/register');
            } else {
                // Create Account
                await CreateAccount(req.body.username, password, req.body.email, firstname, lastname);
                res.json('CREATE ACCOUNT SUCCESSFULLY! YOU CAN LOGIN NOW');
                // Add direct here!
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({"Create account errors: ": err});
        }
    });
}

export default register;