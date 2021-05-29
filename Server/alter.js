// Sequelize can auto create table by running this fileconst {sequelize} = require('./src/models');

const {sequelize} = require('./src/models');

async function main() {
    await sequelize.sync({alter: true});
}

main();