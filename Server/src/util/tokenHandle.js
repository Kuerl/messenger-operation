const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = async (user, secretSignature, tokenLife) => {
    const userData = {
        _id: user._id,
        username: user.user_name,
    }
    try {
        jwt.sign(
            {data: userData},
            secretSignature,
            {
              algorithm: "HS256",
              expiresIn: tokenLife,
            },
            (err, token) => {
                if(err) {
                    console.log('Error: ', err);
                    return err;
                }
                console.log('Token: ', token);
            }
        );
    } catch (err) {
        console.log("Generate Token Fail: ", err);
    }
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