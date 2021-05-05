import path from 'path';

const home = (server, bodyParser) => {
    server.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/home.html'));
    })
}

export default home;