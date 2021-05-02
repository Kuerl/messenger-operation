const jwt = require('jsonwebtoken');

// Generate JWT
async function generateToken(user, secretSignature, tokenLife) {
    const userData = {
        _id: user._id,
        username: user.user_name,
    }
    return jwt.sign(
        {data: userData},
        secretSignature,
        {
            algorithm: "HS256",
            expiresIn: tokenLife,
        }
    );
}

// Verify Token
const verifyToken = async (token, secretSignature) => {
    try {
        jwt.verify(token, secretSignature, (decoded) => {
            return decoded
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    generateToken,
    verifyToken
}