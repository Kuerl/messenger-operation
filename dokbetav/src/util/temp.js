import axios from './axios'; 

async function main() {
    await axios.post('/', {
        title: 'ABC',
        members: ['ac']
    }); //
}

main();