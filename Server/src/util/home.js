import path from 'path';
import {Accounts, Teams} from '../models';
import {CreateTeam, CreateTeamParticular, CreateChannel, CreateChannelParticular, CreateChannelOriginal} from './creator';
import { v4 as uuidv4 } from 'uuid';
import {QueryTeams, QueryAccountPK} from './query';

const home = async (server, bodyParser) => {
    let USERPARAM = [];
    server.get('/', (req, res) => {
        res.json();
        res.sendFile(path.join(__dirname, '../public/html/home.html'));
    });
    // Add authen middleware -----------------------------------------------------
    server.post('/', async (req, res) => {
        const {username} = req.body;
    });

    // Load all user -------------------------------------------------------------
    try {
        let all = await Accounts.findAll({
            attributes: ['id','username', 'status']
        });
        for (let index = 0; index < all.length; index++) {
            const id = all[index].dataValues.id;
            const us = all[index].dataValues.username;
            const em = all[index].dataValues.status
            USERPARAM.push({id: id, username: us, status: em});
        }
        console.log(USERPARAM);
    } catch (error) {
        console.log(error);
    }

    // Get Teams list ------------------------------------------------------------
    server.get('/:user/getteam', bodyParser, async (req, res) => {
        console.log('REQUEST FROM: ', req.params);
        console.log(req.body);
        let usidFTU = await QueryAccountPK(req.params.user.toLowerCase());
        console.log(usidFTU);
        let getteamResult = await QueryTeams(usidFTU);
        console.log(getteamResult);
        res.json({teamList: getteamResult});
    });

    // Create a new Team ---------------------------------------------------------
    server.post('/:user/createteam', bodyParser, async (req, res) => {
        console.log('REQ: ', req.body);
        try {
            const username = req.params.user.toLowerCase();
            const {title, member} = req.body;
            const UUIDV4 = uuidv4();
            let userID;
            let MemPK;
            let TeamPK;
            // Create UNIQUE {title}
            let Ttitle = title+'-*khmluerl*-'+UUIDV4;
                for (let index = 0; index < USERPARAM.length; index++) {
                    const element = USERPARAM[index];
                    if(element.username == username) {
                        console.log(element.id);
                        userID = element.id;
                    }
                    if (element.username == member) {
                        MemPK = element.id;
                    }
                }
            // TEAMs
            console.log(Ttitle);
            await CreateTeam(Ttitle, userID);
                // Get TeamPK => Create TeamParticular
                let TEAMSWAP = await Teams.findOne({where: {title: Ttitle}})
                if (TEAMSWAP == null) {  
                    return res.json('Fail to create TEAMP');
                }
                TeamPK = TEAMSWAP.dataValues.id;
                await CreateTeamParticular(MemPK ,TeamPK);
                await CreateTeamParticular(userID, TeamPK);  
            // CHANNELs
            await CreateChannelOriginal(userID ,TeamPK, UUIDV4);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
        
    });
}

export default home;