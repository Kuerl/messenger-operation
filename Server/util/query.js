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
    // QueryAccounts (Allatt):
    export async function QueryAccountAllAtt(id) {
        try {
            let queryaccounts = await Accounts.findOne({
                where: {
                    id
                }
            });
            return {
                username: queryaccounts.dataValues.username,
                firstname: queryaccounts.dataValues.firstname,
                lastname: queryaccounts.dataValues.lastname,
                email: queryaccounts.dataValues.email,
                status: queryaccounts.dataValues.status
            };
        } catch (error) {
            return false;
        }
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

    // Query USER of TEAM
    export async function QueryTeamUser(team_id) {
        let userteam = [];
        let teamparticular = await Teamparticular.findAll({
            attributes: ['user_id'],
            where: {
                team_id,
            }
        });
        for (let index = 0; index < teamparticular.length; index++) {
            const element = teamparticular[index];
            userteam.push({user_id: element.dataValues.user_id});
        }
        return userteam;
    }

// Query Channels of a Team:
    export async function QueryChannels(team_id) {
        let channels = {text: [], voice: []};
        try {
            let QueryChannel = await Channels.findAll({
                where: {
                    team_id
                }
            });
            for (let index = 0; index < QueryChannel.length; index++) {
                const element = QueryChannel[index];
                if (element.type_) {
                    channels.text.push({
                        id: element.id,
                        title: element.title
                    })
                } else {
                    channels.voice.push({
                        id: element.id,
                        title: element.title
                    })
                }
            }
            return channels;
        } catch (error) {
            return false
        }
    }

    // Query ChannelsParticular by channel_id:
    export async function QueryChannelparticular(channel_id) {
        let channelparticular = [];
        try {
            let querychannelparticular = await Channelparticular.findAll({
                where: {
                   channel_id 
                }
            })
            for (let i = 0; i < querychannelparticular.length; i++) {
                const element = querychannelparticular[i];
                // console.log('ELEMENT: ', element);
                let account = await QueryAccountAllAtt(element.user_id);
                channelparticular.push(account);
            }
            // console.log(channelparticular);
            return channelparticular;
        } catch (error) {
            return false
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
            return false;
        }
    }