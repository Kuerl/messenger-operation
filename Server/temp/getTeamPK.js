const {Teams} = require( '../src/models');

async function main() {
    let TEAMSWAP = await Teams.findOne({where: {title: 'TEST1-*khmluerl*-f091e06c-1c1c-4844-8c5e-78cacd204ecd'}})
    console.log(
        'data: ',
        TEAMSWAP
    );
}

main();