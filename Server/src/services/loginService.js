const { generateToken, verifyToken } = require('../util/tokenHandle');
const tokenConf = require('../config/tokenConf.json');

const { sequelize, Accounts, Varification } = require('../models');

const accessTokenSecret  = tokenConf.ACCESS_TOKEN_SECRET;
const accessTokenLife = tokenConf.ACCESS_TOKEN_LIFE;
const refreshTokenLife = tokenConf.REFRESH_TOKEN_LIFE;

const Login = function(server, body, session) {
    // Login
    server.get('/login', async (req, res) => {
        try {
            res.send('Login Page')
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Err: ', err);
        }
    })

    server.post('/login', async (req, res) => {
        try {
            let username = await Accounts.findOne({
                where: {
                    user_name: req.body.user_name.toLowerCase(),
                    password: req.body.password
                }
            });
                if (username !== null) {
                    try {
                        const accessToken = await generateToken( req.body, accessTokenSecret, refreshTokenLife);
                        res.status(200).json("Your was login successfully!\n", {accessToken, refreshToken});
                    } catch (err) {
                        res.status(500).json(err);
                    }
                }
                else {
                    res.json("Your username or password is incorrect!");
                }
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error (2): ', err);
        }
    })
}

module.exports = {
    Login
}