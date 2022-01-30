import {createConnection} from 'typeorm';

export async function setup() {

    //console.log(__dirname);
    await createConnection().then(() => console.log('😆 Connectou no Banco de dados!!'))
}

