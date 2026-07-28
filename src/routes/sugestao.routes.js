import { Router } from "express";
import autenticar from "../middlewares/autenticacao.middleware.js";
import apenasAdmin from "../middlewares/admin.middleware.js";
import validarSugestao from "../middlewares/validarSugestao.middleware.js";
import SugestaoController from "../controllers/sugestao.controller.js";

const router = Router();

router.get("/", SugestaoController.listarSugestoes);
router.post("/", autenticar, validarSugestao.validarCriacao, SugestaoController.criarSugestao);
router.patch("/:id", autenticar, apenasAdmin, validarSugestao.validarAtualizacao, SugestaoController.atualizarSugestao);
router.delete("/:id", autenticar, apenasAdmin, validarSugestao.validarId, SugestaoController.deletarSugestao);

export default router;
