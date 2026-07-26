import SugestaoService from "../services/sugestao.service.js";

async function criarSugestao(req, res, next) {
    try {
        const sugestao = await SugestaoService.criarSugestao(req.usuario.id, req.body);
        return res.status(201).json(sugestao);
    } catch (error) {
        next(error);
    }
}

async function atualizarSugestao(req, res, next) {
    try {
        const sugestaoAtualizada = await SugestaoService.atualizarSugestao(req.params.id, req.body.status);
        return res.status(200).json(sugestaoAtualizada);
    } catch (error) {
        next(error);
    }
}

async function deletarSugestao(req, res, next) {
    try {
        const sugestaoDeletada = await SugestaoService.deletarSugestao(req.params.id);
        return res.status(200).json(sugestaoDeletada);
    } catch (error) {
        next(error);
    }
}

async function listarSugestoes(req, res, next) {
    try {
        const sugestoes = await SugestaoService.listarSugestoes();
        return res.status(200).json(sugestoes);
    } catch (error) {
        next(error);
    }
}

const SugestaoController = {
    criarSugestao,
    atualizarSugestao,
    deletarSugestao,
    listarSugestoes,
};

export default SugestaoController;
