var dashboardModel = require("../models/dashboardModel");

function buscarResultadosPorUsuario(req, res) {
  var idUsuario = Number(req.params.idUsuario);

  // garante que só um número inteiro positivo chega no SQL
  if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
    res.status(400).send("idUsuario inválido!");
    return;
  }

  dashboardModel.buscarResultadosPorUsuario(idUsuario).then((resultado) => {
    // sem tentativas devolve [] (200) e o dashboard mostra o aviso
    res.status(200).json(resultado);
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os resultados: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  buscarResultadosPorUsuario
}
