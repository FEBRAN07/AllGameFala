import { Router } from "express";
import autenticar from "../middlewares/autenticacao.middleware.js";
import apenasAdmin from "../middlewares/admin.middleware.js";
import SugestaoController from "../controllers/sugestao.controller.js";

const router = Router();
router.get("/", SugestaoController.listarSugestoes);
router.post("/", autenticar, SugestaoController.criarSugestao);
router.patch("/:id", autenticar, apenasAdmin, SugestaoController.atualizarSugestao);
router.delete("/:id", autenticar, apenasAdmin, SugestaoController.deletarSugestao);

export default router;
