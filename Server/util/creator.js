import { Accounts, Varification, Teams, Teamparticular, Channels, Channelparticular, Messages, Attachments } from '../models';
import {QueryTeamUser, QueryAccountPK, QueryChannels, QueryTeams, QueryTeambyTitle, QuerychannelbyTitle} from './query';

// Import Util: Transfer
import { TransferNewCreatedTeam } from './transfer';

// Create ACCOUNT
export async function CreateAccount(username, password, email, firstname, lastname) {
    await Accounts.create({ 
        username: username.toLowerCase(),
        password,
        email: email.toLowerCase(),
        is_active: true,
        status: "Active",
        firstname,
        lastname,
        block_count: 0,
        is_block: false
    });
}
    // Create VARIFICATION
    export async function CreateVarification(vari_code, user_id) {
        await Varification.create({
            vari_code,
            user_id
        });
    }

// Create TEAM
export async function CreateTeam(title, user_id) {
    await Teams.create({
        title,
        user_id
    });
}
    // Create TEAMPARTICULAR
    export async function CreateTeamParticular(user_id, team_id) {
        await Teamparticular.create({
            user_id,
            team_id
        });
    }

    // Create Original Team:
    export async function CreateOriginalTeam(title, owner, members, uuid, io) {
        // This is team list:
        let userIDList = {members: []};
        try {
            let OwnerID = await QueryAccountPK(owner.toLowerCase());
            userIDList.owner = OwnerID;
            for (let i = 0; i < members.length; i++) {
                const element = members[i];
                let tempID = await QueryAccountPK(element);
                userIDList.members.push(tempID);
            }

            await CreateTeam(title, userIDList.owner);  // This is Team creator
            // Then
            // Query this team primary key (from userID - ownerID):
            let createdTeamData = await QueryTeambyTitle(title);
            userIDList.team_id =  createdTeamData.dataValues.id;

            // Create team particular of all member:
            await CreateTeamParticular(userIDList.owner, userIDList.team_id);   // Create owner particular
            for (let i = 0; i < userIDList.members.length; i++) {
                const element = userIDList.members[i];
                await CreateTeamParticular(element, userIDList.team_id);
            }

            // Get uuid
            await CreateOriginalChannels(userIDList, uuid);

            // Send new created team to members:
            await TransferNewCreatedTeam(owner, members, title, io);

        } catch (error) {
            console.log(error);
        }
    }

// Create CHANNEL
export async function CreateChannel(type_, user_id, team_id, title) {
    await Channels.create({
        type_,
        user_id,
        team_id,
        title
    });
}

    // Create ChannelParticular
    export async function CreateChannelParticular(user_id, channel_id) {
        await Channelparticular.create({
            user_id,
            channel_id
        });
    }

    // Create Original Channels:
    export async function CreateOriginalChannels(userIDList, uuid) {
        try {
            // General channel: (type: true)
            await CreateChannel(true, userIDList.owner, userIDList.team_id, 'General'+'-*khmluerl*-'+uuid);
            // Get channel primary key:
            let gchannelID = await QuerychannelbyTitle('General'+'-*khmluerl*-'+uuid);
            await CreateChannelParticular(userIDList.owner, gchannelID);
            for (let i = 0; i < userIDList.members.length; i++) {
                const element = userIDList.members[i];
                await CreateChannelParticular(element, gchannelID);
            }

        // Voice Channel: (type: false)
        await CreateChannel(false, userIDList.owner, userIDList.team_id, 'Voice'+'-*khmluerl*-'+uuid);
            // Get channel primary key:
            let vchannelID = await QuerychannelbyTitle('Voice'+'-*khmluerl*-'+uuid);
            await CreateChannelParticular(userIDList.owner, vchannelID);
            for (let i = 0; i < userIDList.members.length; i++) {
                const element = userIDList.members[i];
                await CreateChannelParticular(element, vchannelID);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // BACSIC CHANNEL:
    export async function CreateChannelOriginal(user_id, team_id, UUIDV4) {
        let TU = await QueryTeamUser(team_id);
        console.log('TU: ', TU);
        const GEN = 'general-*khmluerl*-'+UUIDV4;
        const VOICE = 'voice-*khmluerl*-'+UUIDV4;
        // Create true: TEXT CHANNEL
        await CreateChannel(
            true, user_id, team_id, GEN
        );
            // Create TEXT CHANNEL PARTICULAR
            let findOneChannel = await Channels.findOne({
                where: {
                    title: GEN,
                }
            })
            let TCHANNELPK= findOneChannel.dataValues.id
            for (let index = 0; index < TU.length; index++) {
                const element = TU[index].user_id;
                console.log('GC: E: ',element);
                await CreateChannelParticular(
                    element, TCHANNELPK
                );
            }
        // Create false: VOICE CHANNEL
        await CreateChannel(
            false, user_id, team_id, VOICE
        );
        // Create TEXT CHANNEL PARTICULAR
        let findOneChannelV = await Channels.findOne({
            where: {
                title: VOICE,
            }
        });
        let VCHANNELPK = findOneChannelV.dataValues.id
        for (let index = 0; index < TU.length; index++) {
            const element = TU[index].user_id;
            console.log('VC: E: ',element);
            CreateChannelParticular(
                element, VCHANNELPK
            );
        }
        
    }

    // Create new CHANNEL

// Create MESSAGE
export async function CreateMessage(messages_att, message_, user_id, contact_id, att_id, channel_id) {
    await Messages.create({
        messages_att,
        message_,
        user_id,
        contact_id,
        att_id,
        channel_id
    });
}

    // Create ATTACHMENT
    export async function CreateAttachment(file_url, user_id, data) {
        await Attachments.create({
            file_url, user_id, data
        });
    }

// ADD USER TO TEAM/CHANNEL
export async function CreateNewUser(username, team_id) {
    // Query user_id:
    let user_id = await QueryAccountPK(username);
    // Create Teamparticular
    await Teamparticular.create({user_id, team_id});
    // Query channel_id:
    let channelList = await QueryChannels(team_id);
    // Create Channelparticular:
    for (let index = 0; index < channelList.length; index++) {
        const element = channelList[index].dataValues;
        await Channelparticular.create({user_id, channel_id: element.id});
    }
}

// Create New Channel

