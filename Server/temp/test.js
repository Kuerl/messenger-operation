const {generateToken, verifyToken} = require('../src/util/tokenHandle');

const body = {
    _id: '1234321',
    user_name: 'Kuerl'
}

const secret = require('../src/config/tokenConf.json');
const secretSignature = secret.ACCESS_TOKEN_SECRET;
const tokenLife = secret.ACCESS_TOKEN_LIFE;

const main = async () => {
    let token = await generateToken(body, secretSignature, tokenLife);
    console.log(token);
}

main();