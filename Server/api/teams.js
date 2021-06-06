// This API handle Query and Create a new team
// Import Packages:
import { v4 as uuidv4 } from 'uuid';

// Import Util:
import { QueryTeams } from '../util/query';
import { CreateOriginalTeam } from '../util/creator';

// Import API:

const teams = async (server, bodyParser, io) => {
    // Get list of Teams when a user login into the homepage
    server.get('/:user/getteam', bodyParser, async (req, res) => {
        const { user } = req.params;
        try {
            let TeamsList = await QueryTeams(user);
                if (TeamsList == 'error') {
                    throw error;
                }
            return res.status(205).json({TeamsList: TeamsList});
        } catch (error) {
            console.log('FROM: /:', user,'/getteam: ERROR: ', error);
            return res.status(400).json('ServerError');
        }
    });

    // Post: Create a Team
    server.post('/:user/createteam', bodyParser, async (req, res) => {
        const { user } = req.params;
        const { title, members } = req.body;
        const UUIDV4 = uuidv4();
        let teamInformation = {
            title: title+'-*khmluerl*-'+UUIDV4,
            members: members,
            owner: user
        };
        try {
            await CreateOriginalTeam(teamInformation.title, user, teamInformation.members, UUIDV4, io);
            return res.json('Create Team Successfully!');
        } catch (error) {
            console.log(error);
            return res.status(404).json('Cannot create a new team');
        }
    });
}

export default teams;