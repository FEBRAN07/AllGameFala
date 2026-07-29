import JogoController from "../controllers/jogo.controller.js";
import apenasAdmin from "../middlewares/admin.middleware.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import validarJogo from "../middlewares/validarJogo.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/buscar", validarJogo.validarBusca, JogoController.buscar);
router.get("/:idIGDB", validarJogo.validarIdIGDB, JogoController.getJogo);
router.get("/", JogoController.listar);
router.patch("/:id", autenticar, apenasAdmin, validarJogo.validarAtualizacao, JogoController.atualizarJogo);
router.delete("/:id", autenticar, apenasAdmin, validarJogo.validarId, JogoController.deletarJogo);
router.post("/", autenticar, apenasAdmin, validarJogo.validarCadastro, JogoController.cadastrarJogo);

export default router;
