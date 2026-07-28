import { Router } from "express";

import ReviewController from "../controllers/review.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import apenasAdmin from "../middlewares/apenasAdmin.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Rotas públicas
|--------------------------------------------------------------------------
*/

// Lista todas as reviews
router.get("/", ReviewController.listarTodas);

// Lista reviews de um jogo
router.get("/jogo/:idJogo", ReviewController.listarPorJogo);

// Lista reviews de um usuário
router.get("/usuario/:idUsuario", ReviewController.listarPorUsuario);

// Busca uma review específica
router.get("/:id", ReviewController.buscarPorId);

/*
|--------------------------------------------------------------------------
| Rotas autenticadas
|--------------------------------------------------------------------------
*/

// Criar review
router.post("/", autenticar, ReviewController.criar);

// Atualizar review (somente dono)
router.patch("/:id", autenticar, ReviewController.atualizar);

// Excluir review (somente dono)
router.delete("/:id", autenticar, ReviewController.remover);

/*
|--------------------------------------------------------------------------
| Rota administrativa
|--------------------------------------------------------------------------
*/

router.get(
    "/admin/todas",
    autenticar,
    apenasAdmin,
    ReviewController.listarTodas
);

export default router;