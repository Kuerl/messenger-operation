// This Util handle socket IO: transfer data: messages, new channels, new teams,...
// Import Packages

// Import API
import { io } from "../index";

// Constants Channels:
import { socketRoot } from "../constants/socketchannels";

// Original transfer function:
export const Transfer = async (channels, datas) => {
    try {
        io.emit(channels, datas);
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Send new created team to members
export const TransferNewCreatedTeam = async (owner, members, title, io) => {
    // Emit owner:
    await Transfer(socketRoot+'/'+owner, {title, owner, members}, io);
    console.log(socketRoot+'/'+owner);
    // Emit members:
    for (let i = 0; i < members.length; i++) {
        const element = members[i];
        await Transfer(socketRoot+'/'+element, {title, owner, members}, io);
        console.log(socketRoot+'/'+element);
    }
}