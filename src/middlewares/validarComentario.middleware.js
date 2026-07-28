import mongoose from "mongoose";
import criarErro from "../utils/criarErro.js";

function validarCriacao(req, res, next) {

    const { comentario } = req.body;

    if (!comentario || typeof comentario !== "string" || !comentario.trim()) {
        return next(criarErro("O campo 'comentario' é obrigatório.", 400));
    }

    if (comentario.trim().length > 1000) {
        return next(criarErro("O comentário deve ter no máximo 1000 caracteres.", 400));
    }

    next();
}

function validarAtualizacao(req, res, next) {

    const { comentario } = req.body;

    if (comentario === undefined) {
        return next(criarErro("Informe o campo 'comentario' para atualizar.", 400));
    }

    if (typeof comentario !== "string" || !comentario.trim()) {
        return next(criarErro("O campo 'comentario' não pode ser vazio.", 400));
    }

    if (comentario.trim().length > 1000) {
        return next(criarErro("O comentário deve ter no máximo 1000 caracteres.", 400));
    }

    next();
}

function validarIdReview(req, res, next) {

    const { idReview } = req.params;

    if (!mongoose.Types.ObjectId.isValid(idReview)) {
        return next(criarErro("ID de review inválido.", 400));
    }

    next();
}

function validarIdComentario(req, res, next) {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(criarErro("ID de comentário inválido.", 400));
    }

    next();
}

const validarComentario = {
    validarCriacao,
    validarAtualizacao,
    validarIdReview,
    validarIdComentario,
};

export default validarComentario;