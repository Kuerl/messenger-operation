const {generateToken, verifyToken} = require('../src/util/tokenHandle');

const body = {
    _id: '1234321',
    user_name: 'Kuerl'
}

const secret = require('../src/config/tokenConf.json');
const secretSignature = secret.ACCESS_TOKEN_SECRET;
const tokenLife = secret.ACCESS_TOKEN_LIFE;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjEyMzQyMzEiLCJ1c2VybmFtZSI6Ikt1ZXJsIn0sImlhdCI6MTYxOTkyMDkzMSwiZXhwIjoxNjIwMDA3MzMxfQ.ecshAXaCecuI3uYdwYboo3YrJAvPaNBXT6EENdXbUgQ';

const main = async () => {
    let verify = await verifyToken(token, secretSignature);
    console.log(verify.exp);
    console.log(Date.now() <= verify.exp*1000);
}

main();