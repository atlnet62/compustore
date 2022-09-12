import mysql from 'mysql2/promise';

// on va chercher les variables d'environnement déclarées dans le fichier .env
import {DB_HOST, DB_NAME, DB_USER, DB_PWD, DB_PORT} from './../lib/index.js';

// configuration pour se connecter à la base de données
const pool = mysql.createPool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PWD,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit:0,
});

pool.getConnection()
    .then(res => {
        console.log(`Connected to ${res.config.database}`)
    })
    .catch(err => console.log('ERROR --->',err))

export default pool;