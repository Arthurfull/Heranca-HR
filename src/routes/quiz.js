const express = require("express");
const ResultadoController = require("../controllers/quizController");

const router = express.Router();

router.post("/", ResultadoController.criar);
router.get("/", ResultadoController.listar);
router.get("/:id", ResultadoController.buscarPorId);

module.exports = router;