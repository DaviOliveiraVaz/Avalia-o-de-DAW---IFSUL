const conexao = require("../config/database");
var {Schema, model} = require("mongoose")

var ProdutoSchema = conexao.Schema({
  nome:           { type: 'String' },
  descricao:      { type: 'String' },
  marca:          { type: 'String' },
  valor:          { type: 'Number' },
  frete:          { type: 'Number' },
  estoque:        { type: 'Number' },
  empresa: { type: conexao.Schema.Types.ObjectId },
});

module.exports = conexao.model("Produto", ProdutoSchema);


