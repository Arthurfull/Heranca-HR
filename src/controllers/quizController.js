const ResultadoModel = require("../models/quizModel");

// Número inteiro maior ou igual a zero
function inteiroNaoNegativo(valor) {
    return Number.isInteger(valor) && valor >= 0;
}

// Número inteiro maior que zero (ids)
function inteiroPositivo(valor) {
    return Number.isInteger(valor) && valor > 0;
}

const ResultadoController = {

    // POST /resultados
    async criar(req, res) {
        try {
            const { acertos, erros, fkUsuario } = req.body;

            if (!inteiroNaoNegativo(acertos) || !inteiroNaoNegativo(erros)) {
                return res.status(400).json({
                    erro: "acertos e erros devem ser números inteiros maiores ou iguais a 0."
                });
            }

            if (!inteiroPositivo(fkUsuario)) {
                return res.status(400).json({
                    erro: "fkUsuario é obrigatório e deve ser o id de um usuário."
                });
            }

            const idResultado = await ResultadoModel.criar({ acertos, erros, fkUsuario });
            return res.status(201).json({ idResultado, mensagem: "Resultado salvo com sucesso." });

        } catch (erro) {
            // fkUsuario que não existe na tabela Usuario (violação da chave estrangeira)
            if (erro.code === "ER_NO_REFERENCED_ROW_2") {
                return res.status(400).json({ erro: "Usuário não encontrado." });
            }

            console.error("Erro ao salvar resultado:", erro);
            return res.status(500).json({ erro: "Erro interno ao salvar o resultado." });
        }
    },

    // GET /resultados
    async listar(req, res) {
        try {
            const resultados = await ResultadoModel.listarTodos();
            return res.json(resultados);
        } catch (erro) {
            console.error("Erro ao listar resultados:", erro);
            return res.status(500).json({ erro: "Erro interno ao listar os resultados." });
        }
    },

    // GET /resultados/:id
    async buscarPorId(req, res) {
        try {
            const id = Number(req.params.id);

            if (!inteiroPositivo(id)) {
                return res.status(400).json({ erro: "Id inválido." });
            }

            const resultado = await ResultadoModel.buscarPorId(id);

            if (!resultado) {
                return res.status(404).json({ erro: "Resultado não encontrado." });
            }

            return res.json(resultado);
        } catch (erro) {
            console.error("Erro ao buscar resultado:", erro);
            return res.status(500).json({ erro: "Erro interno ao buscar o resultado." });
        }
    }
};

module.exports = ResultadoController;
