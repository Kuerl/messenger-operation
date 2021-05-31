export default async function Transfer(io, channel_id, username, message) {
    try {
        // Socket Emit
        io.emit('DOKBetaV0/'+channel_id+'/client', {channel_id: channel_id,username: username, message: message});
        console.log('SOCKET: ', channel_id);
    } catch (error) {
        console.log(error);
    }
}