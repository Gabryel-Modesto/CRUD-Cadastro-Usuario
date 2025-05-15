import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root135#',
    database: 'node_mysql'
});

connection.connect((error) => {
    if(error) {
        throw new Error(error.message);
    
    };
    
    console.log("Deu certo");

});

export default connection;