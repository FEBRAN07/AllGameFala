import { Router } from "express";

import ReviewController from "../controllers/review.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import apenasAdmin from "../middlewares/admin.middleware.js";
import validarReview from "../middlewares/validarReview.middleware.js";

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
router.get("/:id", validarReview.validarIdReview, ReviewController.buscarPorId);

/*
|--------------------------------------------------------------------------
| Rotas autenticadas
|--------------------------------------------------------------------------
*/

// Criar review
router.post("/", autenticar, validarReview.validarCriacao, ReviewController.criar);

// Atualizar review (somente dono)
router.patch(
    "/:id",
    autenticar,
    validarReview.validarIdReview,
    validarReview.validarAtualizacao,
    ReviewController.atualizar
);

// Excluir review (somente dono)
router.delete("/:id", autenticar, validarReview.validarIdReview, ReviewController.remover);

// Curtir review
router.post("/:id/like", autenticar, validarReview.validarIdReview, ReviewController.curtir);

// Descurtir review
router.delete("/:id/like", autenticar, validarReview.validarIdReview, ReviewController.descurtir);

/*
|--------------------------------------------------------------------------
| Rota administrativa
|--------------------------------------------------------------------------
*/

router.get("/admin/todas", autenticar, apenasAdmin, ReviewController.listarTodas);

export default router;
