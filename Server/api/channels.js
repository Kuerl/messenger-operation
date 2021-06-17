// This API handle Query channel, messages handle (socket,...) 
// Import Packages

// Import API

// Import Util
import{CreateMessage} from '../util/creator';
import {QueryChannels, QueryChannelparticular, QueryMessages} from '../util/query';
import { Transfer } from '../util/transfer';

const channels = async (server, bodyParser, io) => {
    // Get the list of channel when click to team button
    server.get('/:user/:team', async (req, res) => {
        const {user, team} = req.params;
        let channels = await QueryChannels(team);
        if (channels != false) {
            return res.json(channels);
        } else {
            return res.json('SERVER ERROR: Channels?');
        }
    });

    // This return channel particular
    server.get('/:user/:team/:channel', async (req, res) => {
        const {user, team, channel} = req.params;
        let channelparticular = await QueryChannelparticular(channel);
        return res.json(channelparticular);
    });

    // Handle messages:
    server.get('/:user/:team/:channel/t', async (req, res) => {
        const {user, team, channel} = req.params;
        try {
            let querymsg = await QueryMessages(channel);
            return res.json(querymsg);
        } catch (error) {
            console.log(error);
            return res.json(false);
        }
    });

    server.post('/:user/:team/:channel/t', async (req, res) => {
        const {user, team, channel} = req.params;
        const {message_att, message, contact_id, att_id} = req.body;
        console.log(req.body);
        try {
            // From now, the flow will be devided to two: DATABASE and SOCKET
            await CreateMessage(message_att, message, user, contact_id, att_id, channel);
            await Transfer(channel, {username: user, message: message, channel: channel});
            return res.json(true);
        } catch (error) {
            console.log(error);
            return res.json(false);
        }
    });
}

export default channels;