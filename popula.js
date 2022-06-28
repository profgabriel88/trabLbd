const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);
console.log(dir);

var pg = require('pg');

var connectionString = 'postrges://postgres:123456@localhost/eleicao'
var pgClient = new pg.Client(connectionString);

pgClient.connect();

async function conecta(query) {
  

  var result = await pgClient.query(query);
  
  result.rows.forEach(row => {
    console.log(row);
  });

}

async function leArquivos() {
  await fs.readdir(dir, (err, data) => {
    if (err) return console.log(err);
    console.log(data);
    
    data.forEach(a => {
      var ext = a.split('.');
      
      if(ext[0].includes('create') && ext[1] == 'txt')
        execSql(a);
    })
  });
}

async function execSql(caminho) {

  fs.readFile(caminho, (err, data) => {
      if (err) {
          console.log(err);
          return;
        }
        console.log(data.toString())
      
        conecta(data.toString());
      
      });
}

leArquivos();