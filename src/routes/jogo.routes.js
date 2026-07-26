import JogoController from "../controllers/jogo.controller.js";
import apenasAdmin from "../middlewares/admin.middleware.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import { Router } from "express";

const router = Router();
router.get("/buscar", JogoController.buscar);
router.get("/:idIGDB", JogoController.getJogo);
router.patch("/:id", autenticar, apenasAdmin, JogoController.atualizarJogo);
router.delete("/:id", autenticar, apenasAdmin, JogoController.deletarJogo);
router.post("/", autenticar, apenasAdmin, JogoController.cadastrarJogo);

export default router;
