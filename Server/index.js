// Import Packages
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import path from 'path';
import bodyParser from 'body-parser';
import { sequelize } from './models';

// Import API
import login from './api/login';
import register from './api/register';
import home from './api/home';

// Cors*
import cors from 'cors';

// Define: bodyParser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Define: Server
const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
      origin: '*',
    }
});

// Middleware: Body Parser and Cors
app.use(bodyParser.json());
app.use(cors());

// Define: static files
app.use(express.static(path.join(__dirname, './public')));

// Call App
login(app, urlencodedParser);
register(app, urlencodedParser);
home(app, urlencodedParser, io);

// Socket: Debug
io.on('connection', (socket) => {
    console.log('A client connected');
    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
});

(async () => {
    try {
      await sequelize.sync(
        {alter: true},
        { force: false} //Reset db every time
      );
    } catch (error) {
      console.log(error);
    }
  })();

// Server: Listen, Database: Check connect
server.listen(5000, "127.0.0.1", async function () {
    const host = server.address().address;
    const port = server.address().port;
    try {
        await sequelize.authenticate({alter: true});
        console.log('Connection has been established successfully.');
        console.log("Server start at: http://%s:%s", host, port)
    }
    catch (err) {
        console.log(err);
    }
});