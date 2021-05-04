const {sequelize} = require('./src/models');

async function main() {
    await sequelize.sync({alter: true});
}

main();