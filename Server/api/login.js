import {generateToken} from '../util/tokenHandle';
import tokenConf from '../config/tokenConf.json';
import { QueryAccount } from '../util/query';
import { CreateVarification } from '../util/creator';

const accessTokenSecret  = tokenConf.ACCESS_TOKEN_SECRET;
const accessTokenLife = tokenConf.ACCESS_TOKEN_LIFE;

const login = function(server, bodyParser) {
    server.post('/login', bodyParser, async (req, res) => {
        const { username, password } = req.body;
        try {
            // Check username, password
            let account = await QueryAccount(username, password);
            // Select * From accounts Where username = username, password = password
                switch (account.status) {
                    case true:
                        try {
                            // Create access token
                            const accessToken = await generateToken( req.body, accessTokenSecret, accessTokenLife);     // Create Token
                            if (account.data.block_count >= 5) {
                                return res.json({login: false, message: 'Your account is blocked, please contact with admin!'});
                            }
                            // Save JWT to (varification) database
                            await CreateVarification(accessToken, account.data.id);
                            return res.json({login: true, token: accessToken, message: 'Login successfully!'});
                        } catch (err) {
                            console.log("Errrrr: ", err);
                            return res.json({login: false, message: 'Your username or password is not correct!'});
                        }
                    case false:
                        // For security:
                        if (account.data.block_count >= 4) {
                            // Not increase block_count, change status to BLOCK!
                            await account.data.increment({
                                'block_count': 1
                            });
                            return res.json({login: false, message: 'This account is blocked, please contact with admin!'})
                        } else {
                            // Increase block_count
                            await account.data.increment({
                                'block_count': 1
                            });
                            return res.json({login: false, message: 'Your password is not correct! \n Block counter: '+(account.data.block_count)+'\n After 5 times, your account will be block!'});
                        }
                    case null:
                        return res.json({login: false, message: 'Your username or password is not correct!'});
                }
        } catch (err) {
            console.log(err);
            return res.json({message: "Server Error"});
        }
    })
}

export default login;