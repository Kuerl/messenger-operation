import {
    Accounts,
    Varification,
    Teams,
    Teamparticular,
    Channels,
    Channelparticular,
    Messages,
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
    // Query username:
    export async function QueryUsername(id) {
        let usn = await Accounts.findOne({
            where: {
                id
            }
        });
        return usn.dataValues.username;
    }
    // Query VARIFICATIONs


// Query TEAMs
    export async function QueryTeams(user_id) {
        let GetTeamID = [];
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

// Query Channels of a Team:
    export async function QueryChannels(team_id) {
        let c = [];
        try {
            let QueryChannel = await Channels.findAll({
                where: {
                    team_id
                }
            });
            for (let index = 0; index < QueryChannel.length; index++) {
                const element = QueryChannel[index];
                c.push({
                    id: element.id,
                    title: element.title
                });
            }
            return c;
        } catch (error) {
            return error;
        }
    }

// Query Message:
    export async function QueryMessages(channel_id) {
        try {
            let msgList = [];
            let msg = await Messages.findAll({
                where: {
                    channel_id
                }
            });
            for (let index = 0; index < msg.length; index++) {
                const element = msg[index].dataValues;
                let usn = await QueryUsername(element.user_id);
                msgList.push({
                    user_id: element.user_id,
                    username: usn,
                    message: element.message_
                });
            }
            console.log(msgList);
            return msgList;
        } catch (error) {
            console.log('QMER: ', error);
        }
    }