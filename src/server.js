
const express = require("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db");

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body na aplicaçã
server.use(express.urlencoded({extended: true}))

// utilizando template engine
const nunjucks = require ("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

// configurar rotas
server.get("/",(req,res) => {
  // res.sendFile(__dirname + "/views/index.html");
  res.render("index.html",{title: "Seu marketplace de coleta de resíduos"})
})

server.get("/create-point",(req,res) => {
  // res.sendFile(__dirname + "/views/create-point.html");
  res.render("create-point.html")
})

server.post("/savepoint",(req,res) => {
  // req.body : corpo do nosso formulario

  // inserir dados no banco de Dados
  const query = `
        insert into places (
                            name,
                            image,
                            address,
                            address2,
                            state,
                            city,
                            items

        ) values (?,?,?,?,?,?,?);
        `;

  const values = [req.body.name,
                  req.body.image,
                  req.body.address,
                  req.body.address2,
                  req.body.state,
                  req.body.city,
                  req.body.items];

  function afterInserData(err){
    if(err){
      console.log(err);
      return render.send("Erro no cadastro!")
    }
    console.log("Cadastrado com sucesso");
    console.log(this);

    return res.render("create-point.html", {saved: true})
  }

  db.run(query, values, afterInserData);

})

server.get("/search",(req,res) => {

    const search = req.query.search

    if (search == ""){
      // pesquisa vazia
      return res.render("search-results.html",{total: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err,rows){
      if(err){
        return console.log(err);
      }

      const total = rows.length;

      // mostrar a pagina html com os dados do banco de dados
      res.sendFile(__dirname + "/views/create-point.html");
      return res.render("search-results.html",{places: rows, total})

    })



})


// ligar o servidor
server.listen(3000)
