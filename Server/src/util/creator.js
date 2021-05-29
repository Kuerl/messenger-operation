import {
    Accounts,
    Varification,
    Teams,
    Teamparticular,
    Channel,
    Channelparticular,
    Messages,
    Attachments,
    Channels
} from '../models';

import {QueryTeamUser, QueryAccountPK, QueryChannels} from './query';

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
export async function CreateTeam(title, user_id) {        // Title must be add an uuid after
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

