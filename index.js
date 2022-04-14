var express = require ("express");
const Usuario = require("./model/Usuario");
const Produto = require("./model/Produto");
var app = express();
var path = require("path");

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false})); 

app.get('/', function(req, res){
    res.render("index.ejs", {});
});

app.get('/produto', function(req, res){
    Produto.find({}).then(function(docs){
        res.render('produto.ejs', {Produtos: docs});
    });
});

app.get("/editar/:id", function(req, res){
    Produto.findById(req.params.id).then(function(docs){
        res.render("editar.ejs", { Produto : docs});
    });
});

app.post('/', function(req, res){
    var usuario = new Usuario({
        nome: req.body.nome,
        cnpj: req.body.cnpj,
        email: req.body.email,
        senha: req.body.senha,
        ramo: req.body.ramo,
        telefone: req.body.telefone
    });

    usuario.save(function(err, docs){
        if(err){
            res.send("Deu o seguinte erro ao salvar a empresa: " + err);
        } else{
            res.redirect("/produto");
        }
    });
});

app.post('/produto', function(req, res){
    var produto = new Produto({
        nome: req.body.nome,
        descricao: req.body.descricao,
        marca: req.body.marca,
        valor: req.body.valor,
        frete: req.body.frete,
        estoque: req.body.estoque
    });

    produto.save(function(err, docs){
        if(err){
            res.send("Deu o seguinte erro ao cadastrar o produto: " + err);
        } else{
            res.redirect("/produtos");
        }
    });
});

app.post('/editar/:id', function(req, res){
    Produto.findByIdAndUpdate(req.params.id,
         {
            nome: req.body.nome,
            descricao: req.body.descricao,
            marca: req.body.marca,
            valor: req.body.valor,
            frete: req.body.frete,
            estoque: req.body.estoque
         },
        function(err, docs){
            if(err){
                res.send("Aconteceu o seguinte erro: " + err);
            } else{
                res.redirect("/produto");
            }});
});

app.get('/deletar/:id', function(req, res){
    Produto.findByIdAndDelete(req.params.id, function(err, docs){
        if(err){
            res.send("Aconteceu o seguinte erro: " + err);
        } else{
            res.redirect("/produto"); 
        };
    });
});

app.get('/empresa', function(req, res){
    Usuario.find({}).then(function(docs){
            res.render('empresa.ejs', {Usuarios: docs}); 
    });
}); 

app.get('/produtos', function(req, res){
    Produto.find({}).then(function(docs){
        res.render('list.ejs', {Produtos: docs});
    });
});

app.listen('3000', function(){
    console.log("Conexão iniciada com sucesso!");
});
