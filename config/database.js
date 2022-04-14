const conexao = require("mongoose");

const uri =
    "mongodb+srv://Davi_Vaz:19122541@cluster1.sixln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
conexao.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = conexao;