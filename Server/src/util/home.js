import path from 'path';

const home = (server, bodyParser) => {
    server.get('/', (req, res) => {
        res.json();
        res.sendFile(path.join(__dirname, '../public/html/home.html'));
    });
    // Add authen middleware
    server.post('/', async (req, res) => {
        const {username} = req.body;
    });
}

export default home;