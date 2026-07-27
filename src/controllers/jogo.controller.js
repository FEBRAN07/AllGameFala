import JogoService from "../services/jogo.service.js";

async function buscar(req, res, next) {
    try {
        const resultado = await JogoService.buscarJogos(req.query.q);
        return res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
}

async function cadastrarJogo(req, res, next) {
    try {
        const jogo = await JogoService.cadastrarJogo(req.body);
        return res.status(201).json(jogo);
    } catch (error) {
        next(error);
    }
}

async function getJogo(req, res, next) {
    try {
        const jogo = await JogoService.getOuCriarJogo(req.params.idIGDB);
        return res.status(200).json(jogo);
    } catch (error) {
        next(error);
    }
}

async function atualizarJogo(req, res, next) {
    try {
        const dadosAtualizados = req.body;
        const id = req.params.id;
        const jogoAtualizado = await JogoService.atualizarJogo(id, dadosAtualizados);
        return res.status(200).json(jogoAtualizado);
    } catch (error) {
        next(error);
    }
}

async function deletarJogo(req, res, next) {
    try {
        const id = req.params.id;
        const jogoDeletado = await JogoService.deletarJogo(id);
        return res.status(200).json(jogoDeletado);
    } catch (error) {
        next(error);
    }
}

const JogoController = {
    buscar,
    getJogo,
    atualizarJogo,
    deletarJogo,
    cadastrarJogo,
};

export default JogoController;
