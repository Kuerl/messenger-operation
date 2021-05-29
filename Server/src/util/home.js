import path from 'path';
import {Accounts, Teams} from '../models';
import {CreateTeam, CreateTeamParticular, CreateChannel, CreateChannelParticular, CreateChannelOriginal, CreateMessage, CreateNewUser} from './creator';
import { v4 as uuidv4 } from 'uuid';
import {QueryTeams, QueryAccountPK, QueryChannels, QueryMessages} from './query';
import Transfer from './message'

const home = async (server, bodyParser, io) => {
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
        let usidFTU = await QueryAccountPK(req.params.user.toLowerCase());
        console.log(usidFTU);
        let getteamResult = await QueryTeams(usidFTU);
        console.log(getteamResult);
        res.json({teamList: getteamResult});
    });

    // Create a new Team ---------------------------------------------------------
    server.post('/:user/createteam', bodyParser, async (req, res) => {
        try {
            if(req.body.member == '' || req.body.member == null || req.body.member == undefined || req.body.title == '' || req.body.title == null || req.body.title == undefined) {
                return res.json('INVALID');
            }
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
                        userID = element.id;
                    }
                    if (element.username == member) {
                        MemPK = element.id;
                    }
                }
            // TEAMs
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
            res.json('Create Team Successfully');
        } catch (error) {
            console.log(error);
            res.json(error);
        }
        
    });

    // Get Channel ---------------------------------------------------------
    server.get('/:user/:team', bodyParser, async (req, res) => {
        try {
            let query = await QueryChannels(req.params.team);
            res.json({channelList: query});
        } catch (error) {
            console.log('GETCHANNELERROR: ', error);
            res.json({error: error});
        }
    });

    // Message Handle -------------------------------------------------------
    server.post('/:user/:team/:channel', bodyParser, async (req, res) => {
        console.log(req.body);
        console.log(req.params.channel);
        if (req.body.message_ == '' || req.body.message_ == null || req.body.message_ == undefined) {
            return res.json({error: 'DATABASE IS PROTECTED!'});
        }
        try {
            const {message_att, message_, contact_id, att_id, channel_id} = req.body;
            await Transfer(io, channel_id, req.body.username, message_);
            let user_id = await QueryAccountPK(req.params.user.toLowerCase());
            await CreateMessage(message_att, message_, user_id, contact_id, att_id, channel_id);
            res.json('SUCCESS');
        } catch (error) {
            console.log(error);
            return res.json({error: error});
        }
    });

    // Get Message ----------------------------------------------------------
    server.get('/:user/:team/:channel', async (req, res) => {
        try {
            let msgList = await QueryMessages(req.params.channel);
            console.log(msgList);
            res.json(msgList);
        } catch (error) {
            res.json(error)
        }
    });

    // Add Mem ---------------------------------------------------------------
    server.post('/:user/:team_id/addMem', async (req, res) => {
        try {
            await CreateNewUser(req.params.user, req.params.team_id);
            res.json("Add new member successfully");
        } catch (error) {
            console.log(error);
            res.json(error)
        }
    });
}

export default home;