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
        return jwt.verify(token, secretSignature);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    generateToken,
    verifyToken
}