const { generateToken, verifyToken } = require('./tokenHandle');
const tokenConf = require('../config/tokenConf.json');

const { sequelize, Accounts, Varification } = require('../models');

// Get Token Config
const accessTokenSecret = tokenConf.ACCESS_TOKEN_SECRET;
const tokenLife = tokenConf.ACCESS_TOKEN_LIFE;

// isAuth:
const isAuth = async (req, res, next) => {
    const clientToken = req.body.token || req.query.token || req.headers["x-access-token"];
    if (clientToken) {
        try {
            const decoded = await verifyToken(clientToken, accessTokenSecret);
            // Check expired
            if (decode.exp <= Date.now()/1000) {
                // => Design json request
                const accessToken = await generateToken(req.body.token, accessTokenSecret, tokenLife);
                await Varification.create({
                    vari_code: accessToken,
                    user_id: await Accounts.findOne({
                                where: {
                                    user_name: req.body.user_name.toLowerCase(),
                                }
                            }).id
                });
                // Send res token:
                res.json({"newToken": accessToken});
                next();
            } else {
                next();
            }
            // Save decode to req
            req.jwtDecode = decoded;
            console.log(decoded);
        } catch (err) {
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        // Direct to Login Page
    }
}

module.exports = {
    isAuth
};