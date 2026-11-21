// Este é o arquivo de conexão do seu projeto (o que exporta { executar })
var database = require("../database/config")

// O executar() recebe só o texto do SQL (não aceita "?"), então os valores
// entram direto na instrução. Esta função garante que só número inteiro passa,
// evitando SQL injection.
function inteiro(valor) {
    var numero = Number(valor);
    if (!Number.isInteger(numero)) {
        throw new Error("Valor inválido: esperado um número inteiro.");
    }
    return numero;
}

const ResultadoModel = {

    // Insere um resultado na tabela Quiz e devolve o idResultado gerado
    async criar({ acertos, erros, fkUsuario }) {
        var instrucao = `
            INSERT INTO Quiz (acertos, erros, fkUsuario)
            VALUES (${inteiro(acertos)}, ${inteiro(erros)}, ${inteiro(fkUsuario)});
        `;
        var resultado = await database.executar(instrucao);
        return resultado.insertId;
    },

    // Lista todos os resultados com o nome do usuário (mais recentes primeiro)
    async listarTodos() {
        var instrucao = `
            SELECT q.idResultado, q.acertos, q.erros, q.fkUsuario, u.nome
            FROM Quiz q
            LEFT JOIN Usuario u ON u.id = q.fkUsuario
            ORDER BY q.idResultado DESC;
        `;
        return await database.executar(instrucao);
    },

    // Busca um resultado pelo idResultado (retorna undefined se não existir)
    async buscarPorId(idResultado) {
        var instrucao = `
            SELECT q.idResultado, q.acertos, q.erros, q.fkUsuario, u.nome
            FROM Quiz q
            LEFT JOIN Usuario u ON u.id = q.fkUsuario
            WHERE q.idResultado = ${inteiro(idResultado)};
        `;
        var linhas = await database.executar(instrucao);
        return linhas[0];
    }
};

module.exports = ResultadoModel;
