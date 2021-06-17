// Import Packages

// Import API
import teams from './teams';
import channels from './channels';

// Import Util
import {Accounts} from '../models';
import {CreateTeam, CreateTeamParticular, CreateChannel, CreateChannelParticular, CreateChannelOriginal, CreateMessage, CreateNewUser} from '../util/creator';
import {QueryTeams, QueryAccountPK, QueryChannels, QueryMessages} from '../util/query';
import Transfer from '../util/message'

const home = async (server, bodyParser, io) => {
    let USERPARAM = [];

    // Load all user
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
    
    // For Teams API:
    teams(server, bodyParser, io);
    channels(server, bodyParser, io);

    // For Channel API:

    // Get Channel ---------------------------------------------------------
    // server.get('/:user/:team', bodyParser, async (req, res) => {
    //     try {
    //         let query = await QueryChannels(req.params.team);
    //         res.json({channelList: query});
    //     } catch (error) {
    //         console.log('GETCHANNELERROR: ', error);
    //         res.json({error: error});
    //     }
    // });

    // // Message Handle -------------------------------------------------------
    // server.post('/:user/:team/:channel', bodyParser, async (req, res) => {
    //     console.log(req.body);
    //     console.log(req.params.channel);
    //     if (req.body.message_ == '' || req.body.message_ == null || req.body.message_ == undefined) {
    //         return res.json({error: 'DATABASE IS PROTECTED!'});
    //     }
    //     try {
    //         const {message_att, message_, contact_id, att_id, channel_id} = req.body;
    //         await Transfer(io, channel_id, req.body.username, message_);
    //         let user_id = await QueryAccountPK(req.params.user.toLowerCase());
    //         await CreateMessage(message_att, message_, user_id, contact_id, att_id, channel_id);
    //         res.json('SUCCESS');
    //     } catch (error) {
    //         console.log(error);
    //         return res.json({error: error});
    //     }
    // });

    // // Get Message ----------------------------------------------------------
    // server.get('/:user/:team/:channel', async (req, res) => {
    //     try {
    //         let msgList = await QueryMessages(req.params.channel);
    //         console.log(msgList);
    //         res.json(msgList);
    //     } catch (error) {
    //         res.json(error)
    //     }
    // });

    // // Add Mem ---------------------------------------------------------------
    // server.post('/:user/:team_id/addMem', async (req, res) => {
    //     try {
    //         await CreateNewUser(req.params.user, req.params.team_id);
    //         res.json("Add new member successfully");
    //     } catch (error) {
    //         console.log(error);
    //         res.json(error)
    //     }
    // });
}

export default home;