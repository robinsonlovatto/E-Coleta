// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();
// criar o objeto que ira fazer oprações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;
// utilizar o objeto para fazer operações
db.serialize(() => {
  // criar uma tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      image TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
    `)
//   // inserir dados na tabela
//     const query = `
//       insert into places (
//                           name
//                           image,
//                           address,
//                           address2,
//                           state,
//                           city,
//                           items
//
//       ) values (?,?,?,?,?,?,?);
//       `;
//
//     const values = ["","","","","","",""];
//
//     function afterInserData(err){
//       if(err){
//         return console.log(err);
//       }
//       console.log("Cadastrado com sucesso");
//       console.log(this);
//     }
//
//     db.run(query, values, afterInserData);
//
//   consultar dados
//   db.all(`SELECT * FROM places`,function(err,rows){
//     if(err){
//       return console.log(err);
//     }
//     console.log("Aqui estão seus registros");
//     console.log(rows);
//   })
//
//   // deletar dados da tabela
//   db.run(`DELETE FROM places WHERE id = ?`,[1], function(err){
//     if(err){
//       return console.log(err);
//     }
//     console.log("Registro deletado com sucesso");
//   })
//
})
