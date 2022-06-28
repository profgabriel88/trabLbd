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
    
    
    data.forEach(a => {
      var ext = a.split('.');
      
      if(ext[0].includes('create') && ext[1] == 'txt')
        execSql(a);

      if (ext[1] == 'csv') {
        leCsv(a);
      }
    })
  });
}

async function leCsv(caminho) {
  fs.readFile(caminho, (err, data) => {
    if (err) {
        console.log(err);
        return;
      }
      var linha = data.toString().split(/\r?\n/);

      console.log(linha[0].toString());
      console.log('\n');    
    });
}

async function execSql(caminho) {

  fs.readFile(caminho, (err, data) => {
      if (err) {
          console.log(err);
          return;
        }      
        conecta(data.toString());
      
      });
}

leArquivos();