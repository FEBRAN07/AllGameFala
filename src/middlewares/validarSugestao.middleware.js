import mongoose from "mongoose";
import criarErro from "../utils/criarErro.js";

function validarCriacao(req, res, next) {
    const { comentario, nomeJogo } = req.body;

    if (!comentario) {
        return next(criarErro("O campo 'comentario' é obrigatório.", 400));
    }

    if (typeof comentario !== "string" || comentario.trim().length === 0) {
        return next(criarErro("O campo 'comentario' deve ser uma string não vazia.", 400));
    }

    if (!nomeJogo) {
        return next(criarErro("O campo 'nomeJogo' é obrigatório.", 400));
    }

    if (typeof nomeJogo !== "string" || nomeJogo.trim().length === 0) {
        return next(criarErro("O campo 'nomeJogo' deve ser uma string não vazia.", 400));
    }

    return next();
}

function validarAtualizacao(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(criarErro("O parâmetro 'id' deve ser um ID válido.", 400));
    }

    if (status === undefined) {
        return next(criarErro("O campo 'status' é obrigatório.", 400));
    }

    if (typeof status !== "boolean") {
        return next(criarErro("O campo 'status' deve ser um booleano.", 400));
    }

    return next();
}

function validarId(req, res, next) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(criarErro("O parâmetro 'id' deve ser um ID válido.", 400));
    }

    return next();
}

const validarCampos = {
    validarCriacao,
    validarAtualizacao,
    validarId,
};

export default validarCampos;