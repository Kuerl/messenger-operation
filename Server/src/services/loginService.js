const { generateToken, verifyToken } = require('../util/tokenHandle');
const tokenConf = require('../config/tokenConf.json');
var path = require('path');

const { sequelize, Accounts, Varification } = require('../models');

const accessTokenSecret  = tokenConf.ACCESS_TOKEN_SECRET;
const accessTokenLife = tokenConf.ACCESS_TOKEN_LIFE;
const refreshTokenLife = tokenConf.REFRESH_TOKEN_LIFE;

const Login = function(server, body, jsonParser) {
    // Get Login
    server.get('/login', jsonParser, async (req, res) => {
        try {
            res.sendFile(path.join(__dirname, '../public/login.html'));
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Err: ', err);
        }
    })

    // Post Login
    server.post('/login', jsonParser, async (req, res) => {
        try {
            // Find and check username, password
            console.log(req.body);
            let username = await Accounts.findOne({
                where: {
                    user_name: req.body.user_name.toLowerCase(),    // All of username will be convert to Lowercase (at register)
                    password: req.body.password
                }
            });
            // Select * From accounts Where username = username, password = password
                if (username !== null) {    // Correct Information
                    try {
                        const accessToken = await generateToken( req.body, accessTokenSecret, accessTokenLife);     // Create Token
                        // Save JWT to (varification) Database
                        await Varification.create({
                            vari_code: accessToken,
                            user_id: username.id
                        });
                        res.status(200).json({login: 'success', token: accessToken}).redirect('/');   // Response Token
                    } catch (err) {
                        console.log("Errrrr: ", err);
                        res.status(500).json('Error!');
                    }
                }
                else {  // Not correct Information
                    res.json("Your username or password is incorrect!");
                }
        } catch (err) {
            console.log(err);
            res.status(500).json({"Server Error (2)": err});
        }
    })
}

module.exports = {
    Login
}