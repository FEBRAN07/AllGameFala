import { Router } from "express";

import ReviewController from "../controllers/review.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import apenasAdmin from "../middlewares/admin.middleware.js";
import ReviewValidacaoMiddleware from "../middlewares/review.validacao.middleware.js";

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
router.get("/:id", ReviewValidacaoMiddleware.validarIdReview, ReviewController.buscarPorId);

/*
|--------------------------------------------------------------------------
| Rotas autenticadas
|--------------------------------------------------------------------------
*/

// Criar review
router.post("/", autenticar, ReviewValidacaoMiddleware.validarCriacao, ReviewController.criar);

// Atualizar review (somente dono)
router.patch(
    "/:id",
    autenticar,
    ReviewValidacaoMiddleware.validarIdReview,
    ReviewValidacaoMiddleware.validarAtualizacao,
    ReviewController.atualizar
);

// Excluir review (somente dono)
router.delete("/:id", autenticar, ReviewValidacaoMiddleware.validarIdReview, ReviewController.remover);

// Curtir review
router.post("/:id/like", autenticar, ReviewValidacaoMiddleware.validarIdReview, ReviewController.curtir);

// Descurtir review
router.delete("/:id/like", autenticar, ReviewValidacaoMiddleware.validarIdReview, ReviewController.descurtir);

/*
|--------------------------------------------------------------------------
| Rota administrativa
|--------------------------------------------------------------------------
*/

router.get("/admin/todas", autenticar, apenasAdmin, ReviewController.listarTodas);

export default router;
