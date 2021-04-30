const { generateToken, verifyToken } = require('./tokenHandle');
const tokenConf = require('../config/tokenConf.json');

// Get Token Config
const accessTokenSecret = tokenConf.ACCESS_TOKEN_SECRET;
const tokenLife = tokenConf.ACCESS_TOKEN_LIFE;

const isAuth = async (req, res, next) => {
    const clientToken = req.body.token || req.query.token || req.headers["x-access-token"];
    
    if (clientToken) {
        try {
            const decoded = await verifyToken(clientToken, accessTokenSecret);
            // Save decode to req
            req.jwtDecode = decoded;
        } catch (err) {
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        try {
            
        } catch (err) {
            return res.status(403).send({
                message: 'No token provided.',
            });
        }
    }
}

module.exports = {
    isAuth
};