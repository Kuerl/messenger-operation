const jwt = require('jsonwebtoken');

// Generate JWT
export const generateToken = async (user, secretSignature, tokenLife) => {
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
export const verifyToken = async (token, secretSignature) => {
    try {
        return jwt.verify(token, secretSignature);
    } catch (err) {
        console.log(err);
    }
}