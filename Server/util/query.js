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
    export async function QueryAccount(username, password) {
        let account = await Accounts.findOne({
            where: {
                username: username.toLowerCase(),    // All of username will be convert to Lowercase (at register)
                password: password
            }
        });
        if (account != null) {
            return {data: account, status: true};
        }
        account = await Accounts.findOne({
            where: {
                username: username.toLowerCase(),    // All of username will be convert to Lowercase (at register)
            }
        });
        if (account != null) {
            return {data: account, status: false};
        }
        else {
            return {status: null};
        }
    }

    // Query PK
    export async function QueryAccountPK(username) {
        try {
            let AccPK = await Accounts.findOne({
                where: {
                    username
                }
            });
            if (AccPK == null) {
                return -1;
            }
            return AccPK.dataValues.id;
        } catch (error) {
            return error;
        }
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
    // Query All Teams By username: Account PK => Teamparticular (contain this user_id) => Teams
    export const QueryTeams = async (username) => {
        let TeamsResult = [];
        try {
            let AccPK = await QueryAccountPK(username.toLowerCase());
            if (AccPK == -1) {
                return 'No Account Found';
            }
            let TeamParticularQuery = await Teamparticular.findAll({
                attributes: ['user_id', 'team_id'],
                where: {user_id: AccPK}
            });
            for (let i = 0; i < TeamParticularQuery.length; i++) {
                const element = TeamParticularQuery[i];
                let TeamQuery = await Teams.findOne({
                    where: {
                        id: element.dataValues.team_id
                    }
                });
                TeamsResult.push({
                    id: TeamQuery.dataValues.id,
                    title: TeamQuery.dataValues.title,
                    user_id: TeamQuery.dataValues.user_id
                });
            }
            return TeamsResult;
        } catch (error) {
            console.log('QUERY: QueryTeams: ERROR: ', error);
            return 'error';
        }
    }

    // Query team by its title:
    export const QueryTeambyTitle = async (title) => {
        let teambyTitle = await Teams.findOne({
            where: {
                title
            }
        });
        return teambyTitle;
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

// Query CHANNEL
    export async function QuerychannelbyTitle(title) {
        let channelbyTitle = await Channels.findOne({
            where: {
                title
            }
        });
        return channelbyTitle.dataValues.id;
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