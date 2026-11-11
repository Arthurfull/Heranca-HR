var database = require("../database/config");

function buscarAquariosPorEmpresa(idCodigo
) {
// 
  var instrucaoSql = `SELECT * FROM Usuario a WHERE fkCodigo = ${idCodigo}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(idCodigo, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fk_emp) aquario VALUES (${descricao}, ${idCodigo})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarAquariosPorEmpresa,
  cadastrar
}
