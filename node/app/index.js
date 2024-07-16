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

conn.query(ensureDatabase);

const userNames = ["Alice", "Roberto", "Charles", "Daina", "Eva"];

app.get('/', (req, res) =>{

	const randomIndex = Math.floor(Math.random() * userNames.length);

  	var userName = userNames[randomIndex];

	const sql = `INSERT INTO Users(Name) VALUES (?)`

	conn.query(sql, userName);

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
