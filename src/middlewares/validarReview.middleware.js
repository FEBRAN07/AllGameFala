import mongoose from "mongoose";
import criarErro from "../utils/criarErro.js";

function validarCriacao(req, res, next) {
    const { jogo, nota, comentario } = req.body;

    if (!jogo) {
        return next(criarErro("O campo 'jogo' é obrigatório.", 400));
    }

    if (!mongoose.Types.ObjectId.isValid(jogo)) {
        return next(criarErro("O campo 'jogo' é inválido.", 400));
    }

    if (nota === undefined || nota === null) {
        return next(criarErro("O campo 'nota' é obrigatório.", 400));
    }

    if (typeof nota !== "number" || nota < 0 || nota > 5) {
        return next(criarErro("A nota deve ser um número entre 0 e 5.", 400));
    }

    if (!comentario || typeof comentario !== "string" || !comentario.trim()) {
        return next(criarErro("O campo 'comentario' é obrigatório.", 400));
    }

    if (comentario.trim().length > 2000) {
        return next(criarErro("O comentário deve ter no máximo 2000 caracteres.", 400));
    }

    next();
}

function validarAtualizacao(req, res, next) {
    const { nota, comentario } = req.body;

    if (nota === undefined && comentario === undefined) {
        return next(criarErro("Informe ao menos um campo para atualizar.", 400));
    }

    if (nota !== undefined) {
        if (typeof nota !== "number" || nota < 0 || nota > 5) {
            return next(criarErro("A nota deve ser um número entre 0 e 5.", 400));
        }
    }

    if (comentario !== undefined) {
        if (typeof comentario !== "string" || !comentario.trim()) {
            return next(criarErro("O campo 'comentario' não pode ser vazio.", 400));
        }

        if (comentario.trim().length > 2000) {
            return next(criarErro("O comentário deve ter no máximo 2000 caracteres.", 400));
        }
    }

    next();
}

function validarIdReview(req, res, next) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(criarErro("ID de review inválido.", 400));
    }

    next();
}

const validarReview = {
    validarCriacao,
    validarAtualizacao,
    validarIdReview,
};

export default validarReview;
