const { generateToken, verifyToken } = require('../util/tokenHandle');
const tokenConf = require('../config/tokenConf.json');

const { sequelize, Accounts, Varification } = require('../models');

const accessTokenSecret  = tokenConf.ACCESS_TOKEN_SECRET;
const accessTokenLife = tokenConf.ACCESS_TOKEN_LIFE;
const refreshTokenLife = tokenConf.REFRESH_TOKEN_LIFE;

const Login = function(server, body, session) {
    // Get Login
    server.get('/login', async (req, res) => {
        try {
            res.send('Login Page')
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Err: ', err);
        }
    })

    // Post Login
    server.post('/login', async (req, res) => {
        try {
            // Find and check username, password
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
                        res.status(200).json({login: 'success', token: accessToken});   // Response Token
                        // Save JWT to (varification) Database
                        await Varification.create({
                            vari_code: accessToken,
                            user_id: username.id
                        });
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