var database = require("../database/config");

// Busca todas as tentativas do quiz de um usuário, da mais antiga para a mais nova
function buscarResultadosPorUsuario(idUsuario) {

  var instrucaoSql = `
    SELECT idResultado, acertos, erros
    FROM Quiz
    WHERE fkUsuario = ${idUsuario}
    ORDER BY idResultado ASC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarResultadosPorUsuario
}
