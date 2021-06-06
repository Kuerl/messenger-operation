// This API handle Query channel, messages handle (socket,...) 
// Import Packages

// Import API

// Import Util

const channels = async (server, bodyParser, io) => {
    // Get the list of channel when click to team button
    server.get('/:user/:team');
}

export default channels;