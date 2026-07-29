import criarErro from "../utils/criarErro.js";
import mongoose from "mongoose";

function ArrayDeStrings(valor) {
    return (
        Array.isArray(valor) &&
        valor.length > 0 &&
        valor.every((item) => typeof item === "string" && item.trim().length > 0)
    );
}

function validarBusca(req, res, next) {
    const { q } = req.query;

    if (!q) {
        return next(criarErro("A query de busca é obrigatória.", 400));
    }

    if (typeof q !== "string" || q.trim().length === 0) {
        return next(criarErro("A query de busca deve ser uma string não vazia.", 400));
    }

    return next();
}

function validarCadastro(req, res, next) {
    const { titulo, desenvolvedor, publicadoras, dataLancamento, plataformas, genero, sinopse } = req.body;

    if (!titulo) {
        return next(criarErro("O campo 'titulo' é obrigatório.", 400));
    }

    if (typeof titulo !== "string" || titulo.trim().length === 0) {
        return next(criarErro("O campo 'titulo' deve ser uma string não vazia.", 400));
    }

    if (!desenvolvedor) {
        return next(criarErro("O campo 'desenvolvedor' é obrigatório.", 400));
    }

    if (!ArrayDeStrings(desenvolvedor)) {
        return next(criarErro("O campo 'desenvolvedor' deve ser uma lista de strings não vazia.", 400));
    }

    if (!publicadoras) {
        return next(criarErro("O campo 'publicadoras' é obrigatório.", 400));
    }

    if (!ArrayDeStrings(publicadoras)) {
        return next(criarErro("O campo 'publicadoras' deve ser uma lista de strings não vazia.", 400));
    }

    if (!dataLancamento) {
        return next(criarErro("O campo 'dataLancamento' é obrigatório.", 400));
    }

    if (isNaN(Date.parse(dataLancamento))) {
        return next(criarErro("O campo 'dataLancamento' deve ser uma data válida.", 400));
    }

    if (!plataformas) {
        return next(criarErro("O campo 'plataformas' é obrigatório.", 400));
    }

    if (!ArrayDeStrings(plataformas)) {
        return next(criarErro("O campo 'plataformas' deve ser uma lista de strings não vazia.", 400));
    }

    if (!genero) {
        return next(criarErro("O campo 'genero' é obrigatório.", 400));
    }

    if (!ArrayDeStrings(genero)) {
        return next(criarErro("O campo 'genero' deve ser uma lista de strings não vazia.", 400));
    }

    if (!sinopse) {
        return next(criarErro("O campo 'sinopse' é obrigatório.", 400));
    }

    if (typeof sinopse !== "string" || sinopse.trim().length === 0) {
        return next(criarErro("O campo 'sinopse' deve ser uma string não vazia.", 400));
    }

    return next();
}

function validarAtualizacao(req, res, next) {
    const { id } = req.params;
    const {
        titulo,
        desenvolvedor,
        publicadoras,
        dataLancamento,
        plataformas,
        genero,
        sinopse,
        notaMedia,
        quantidadeReviews,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(criarErro("O parâmetro 'id' deve ser um ID válido.", 400));
    }

    if (titulo !== undefined && (typeof titulo !== "string" || titulo.trim().length === 0)) {
        return next(criarErro("O campo 'titulo' deve ser uma string não vazia.", 400));
    }

    if (desenvolvedor !== undefined && !ArrayDeStrings(desenvolvedor)) {
        return next(criarErro("O campo 'desenvolvedor' deve ser uma lista de strings não vazia.", 400));
    }

    if (publicadoras !== undefined && !ArrayDeStrings(publicadoras)) {
        return next(criarErro("O campo 'publicadoras' deve ser uma lista de strings não vazia.", 400));
    }

    if (dataLancamento !== undefined && isNaN(Date.parse(dataLancamento))) {
        return next(criarErro("O campo 'dataLancamento' deve ser uma data válida.", 400));
    }

    if (plataformas !== undefined && !ArrayDeStrings(plataformas)) {
        return next(criarErro("O campo 'plataformas' deve ser uma lista de strings não vazia.", 400));
    }

    if (genero !== undefined && !ArrayDeStrings(genero)) {
        return next(criarErro("O campo 'genero' deve ser uma lista de strings não vazia.", 400));
    }

    if (sinopse !== undefined && (typeof sinopse !== "string" || sinopse.trim().length === 0)) {
        return next(criarErro("O campo 'sinopse' deve ser uma string não vazia.", 400));
    }

    if (notaMedia !== undefined && (typeof notaMedia !== "number" || notaMedia < 0)) {
        return next(criarErro("O campo 'notaMedia' deve ser um número maior ou igual a 0.", 400));
    }

    if (quantidadeReviews !== undefined && (typeof quantidadeReviews !== "number" || quantidadeReviews < 0)) {
        return next(criarErro("O campo 'quantidadeReviews' deve ser um número maior ou igual a 0.", 400));
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

function validarIdIGDB(req, res, next) {
    const { idIGDB } = req.params;

    if (!idIGDB || isNaN(Number(idIGDB))) {
        return next(criarErro("O parâmetro 'idIGDB' deve ser um número válido.", 400));
    }

    return next();
}

const validarJogo = {
    validarBusca,
    validarCadastro,
    validarAtualizacao,
    validarId,
    validarIdIGDB,
};

export default validarJogo;
