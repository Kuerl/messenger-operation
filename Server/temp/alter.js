const {sequelize} = require('../models');

async function main() {
    await sequelize.sync({alter: true});
}

main();