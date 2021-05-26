import {
    Accounts,
    Varification,
    Teams,
    Teamparticular,
    Channel,
    Channelparticular,
    sequelize
} from '../models';

// Query ACCOUNTs

    // Query PK
    export async function QueryAccountPK(username) {
        let apk = await Accounts.findOne({
            where: {
                username
            }
        });
        return apk.dataValues.id
    }
    // Query VARIFICATIONs


// Query TEAMs
    export async function QueryTeams(user_id) {
        let GetTeamID = [];
        console.log('USERID: QUERY: ', user_id);
        let TeamPQuery = await Teamparticular.findAll({
            attributes: ['team_id'],
            where: {
                user_id
            }
        });
        for (let index = 0; index < TeamPQuery.length; index++) {
            const element = TeamPQuery[index];
            let TitleQuery = await Teams.findOne({
                where: {
                    id: element.dataValues.team_id
                }
            });
            let TTitle = TitleQuery.dataValues.title;
            GetTeamID.push({team_id: element.dataValues.team_id, title: TTitle});
        }
        console.log('TEAMS: ', GetTeamID);
        return GetTeamID
    }
    // Query USER's TEAM
    export async function QueryTeamUser(team_id) {
        let tu = [];
        let tp = await Teamparticular.findAll({
            attributes: ['user_id'],
            where: {
                team_id,
            }
        });
        for (let index = 0; index < tp.length; index++) {
            const element = tp[index];
            tu.push({user_id: element.dataValues.user_id});
        }
        return tu;
    }