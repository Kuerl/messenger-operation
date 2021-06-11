// This API handle Query channel, messages handle (socket,...) 
// Import Packages

// Import API

// Import Util
import {QueryChannels} from '../util/query';

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

    server.get('/:user/:team/:channel', async (req, res) => {
        const {user, team, channel} = req.params;
    });
}

export default channels;