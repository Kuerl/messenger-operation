const {Accounts} = require('../models');

const QueryAccounts = async () => {
    let a = await Accounts.findOne({
        where: {
            id: 1
        }
    })
    .then(dataValues);
    console.log(a);
}

QueryAccounts();