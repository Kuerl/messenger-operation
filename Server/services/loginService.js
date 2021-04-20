const express = require('express');
const { sequelize } = require('../models');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try {
        res.send('Testing DB!')
    } catch (err) {
        console.log(err);
    }
});

app.listen(({ port: 5005 }), async () => {
    try {
        console.log('Server start at: http://localhost:5000');
        sequelize.authenticate()
        await sequelize.authenticate();
            console.log('Connection has been established successfully.');
    }
    catch (err) {
        console.log(err);
    }
});