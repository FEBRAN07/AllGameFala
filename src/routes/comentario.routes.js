import { Router } from "express";

import ComentarioController from "../controllers/comentario.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import validarComentario from "../middlewares/validarComentario.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Rotas públicas
|--------------------------------------------------------------------------
*/

// Lista comentários de uma review
router.get("/review/:idReview", validarComentario.validarIdReview, ComentarioController.listarPorReview);

// Lista comentários de um usuário
router.get("/usuario/:idUsuario", ComentarioController.listarPorUsuario);

// Busca um comentário específico
router.get("/:id", validarComentario.validarIdComentario, ComentarioController.buscarPorId);

/*
|--------------------------------------------------------------------------
| Rotas autenticadas
|--------------------------------------------------------------------------
*/

// Criar comentário em uma review
router.post(
    "/review/:idReview",
    autenticar,
    validarComentario.validarIdReview,
    validarComentario.validarCriacao,
    ComentarioController.criar
);

// Atualizar comentário (somente dono)
router.patch(
    "/:id",
    autenticar,
    validarComentario.validarIdComentario,
    validarComentario.validarAtualizacao,
    ComentarioController.atualizar
);

// Excluir comentário (somente dono)
router.delete("/:id", autenticar, validarComentario.validarIdComentario, ComentarioController.remover);

// Curtir comentário
router.post("/:id/like", autenticar, validarComentario.validarIdComentario, ComentarioController.curtir);

// Descurtir comentário
router.delete("/:id/like", autenticar, validarComentario.validarIdComentario, ComentarioController.descurtir);

export default router;
