// This API handle Query and Create a new team
// Import Packages:
import { v4 as uuidv4 } from 'uuid';

// Import Util:
import { QueryTeams, QueryAccountPK } from '../util/query';
import { CreateOriginalTeam } from '../util/creator';
import { Transfer } from '../util/transfer';

// Import API:

const teams = async (server, bodyParser, io) => {
    // Get list of Teams when a user login into the homepage
    server.get('/:user', bodyParser, async (req, res) => {
        const { user } = req.params;
        try {
            let TeamsList = await QueryTeams(user);
                if (TeamsList == 'error') {
                    throw error;
                }
            console.log(TeamsList);
            return res.json({TeamsList: TeamsList});
        } catch (error) {
            console.log('FROM: /:', user,'/getteam: ERROR: ', error);
            return res.json('ServerError');
        }
    });

    // Post: Create a Team
    server.post('/:user', bodyParser, async (req, res) => {
        const { user } = req.params;
        const { title, members } = req.body;
        const UUIDV4 = uuidv4();

        // !MIDDLEWARE
        for (let i = 0; i < members.length; i++) {
            const element = members[i];
            if (element.toLowerCase() == user) {
                members.shift(element);
                i--;
            }
            let middleware = await QueryAccountPK(element.toLowerCase());
            console.log('MW: ', middleware, 'WW', members);
            if (middleware == -1) {
                return res.json('One/some member(s) that you input is/are not exist!')
            }
        }

        let teamInformation = {
            title: title+'-*khmluerl*-'+UUIDV4,
            members: members,
            owner: user
        };
        try {
            await CreateOriginalTeam(teamInformation.title, user, teamInformation.members, UUIDV4);
            Transfer(user+'', true);
            return res.json('Create Team Successfully!');
        } catch (error) {
            console.log(error);
            Transfer(user+'', false);
            return res.status(404).json('Cannot create a new team');
        }
    });
}

export default teams;