const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);

var pg = require('pg');

var connectionString = 'postrges://postgres:123456@localhost/eleicao'
var pgClient = new pg.Client(connectionString);

pgClient.connect();

async function conecta(query) {
  
  try {
    var result = await pgClient.query(query);
  }
  catch (err) {
    console.log(err)
  }

}

var arquivosSql = [];

async function leArquivosSql() {
  await fs.readdir(dir+'/sql', (err, data) => {
    if (err) return console.log(err);

    data.forEach(a => {
      arquivosSql.push(a)
      execSql('./sql/'+a);
    })
  });
}
async function leArquivosCsv() {
  await fs.readdir(dir+'/csv', (err, data) => {
    if (err) return console.log(err);
    data.forEach(a => {
        leCsv('./csv/'+a);
        // console.log(arquivosSql);
    })
  });
}

async function leCsv(caminho) {
  await fs.readFile(caminho, (err, data) => {
    if (err) {
        console.log(err);
        return;
      }
      var contador = 0;
      var tabela = caminho.split('/');
      var linha = data.toString().split(/\r?\n/);

      linha.forEach(l => {
        contador++;
        
        l = l.replace(/"/g, '').replace(/,/g, '.');
        
        var dados = l.split(';');
        l = '';
        
        dados.forEach((d, i) => {
          if(d.includes('/') || d.includes(':')) {
            l += `'${d}'`
          // console.log(dados[i]);
          // console.log('\n');
        }
        else if (!isNaN(parseInt(d)) && !isNaN(parseFloat(d)))
          l += d;
        else {
          l += `'${d}'`;
          // console.log(dados[i]);
        }

        if (i < dados.length-1)
        l += ',';
      });
      
      var insert = `insert into ${tabela[2].replace('.csv', '')} values (${l})`
      conecta(insert);
    });
    console.log(tabela[2] + " " + contador);
      // console.log('\n');
    });
}

async function execSql(caminho) {

  fs.readFile(caminho, (err, data) => {
      if (err) {
          console.log(err);
          return;
        }
        var linha = data.toString().split(/\r?\n/);

      // console.log(linha[0].toString());      
      conecta(data.toString());
      
      });
}

leArquivosSql();
leArquivosCsv();
