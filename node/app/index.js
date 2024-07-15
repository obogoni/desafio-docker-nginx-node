const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')
const conn = mysql.createConnection(config)

const ensureDatabase  = `
CREATE TABLE IF NOT EXISTS Users (
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    PRIMARY KEY (id)
    );`

connection.query(ensureDatabase);

const sql = `INSERT INTO Users(Name) VALUES ('Otavio')`

conn.query(sql)

const getListOfNames = async () => { 
    const query = `SELECT * FROM people`;
    const [result] = await connection.execute(query);
    console.log(result)
    return result;
};

app.get('/', (req, res) =>{

	conn.query('SELECT name FROM Users', (err, results) => {
    
		if (err) {
      
			console.error('Erro:', err);
			res.status(500).send('Erro!');
			return;
    		}

    		let htmlList = '<ul>';
    		
		results.forEach(row => {
      			htmlList += `<li>${row.name}</li>`;
    		});
    
		htmlList += '</ul>';

	
    	res.send('<h1>Full Cycle!</h1>' + htmlList);
  });

});

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
});
