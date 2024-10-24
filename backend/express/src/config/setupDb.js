const { Sequelize } = require('sequelize');

let seqInstance = null;

// Lo correcto es que nombre de base de datos, usuario, contraseña, host y dialect
// deben estar configurados en un archivo .env, y encriptado

const createInstance = async () => {
    const instance = new Sequelize(
        'web', // nombre de base de datos
        'root', // usuario
        'root', // contraseña
        {
            host: '127.0.0.1:3306',
            dialect: 'mysql',
            pool: {
                max: 3
            }
        }
    );

    try {
        await instance.authenticate();
        console.log('Connection has been established successfully.');
        return instance;
    } catch (error) {
        throw new Error('Unable to connecto to database');
    }
};

const getSeqInstance = async () => {
    if (!seqInstance) {
        seqInstance = await createInstance();
    }

    return seqInstance;
};

module.exports = {
    getSeqInstance
};
