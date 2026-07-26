import JogoService from "../services/jogo.service.js";

async function buscar(req, res) {
    try {
        const resultado = await JogoService.buscarJogos(req.query.q);
        return res.status(200).json(resultado);
    } catch (error) {
        console.error(error.response?.data || err.message);
        return res.status(502).json({ error: "Falha ao buscar jogos", message: error.message });
    }
}

async function cadastrarJogo(req, res) {
    try {
        const jogo = await JogoService.cadastrarJogo(req.body);
        return res.status(201).json(jogo);
    } catch (error) {
        return res.status(502).json({ error: "Falha ao cadastrar jogo", message: error.message });
    }
}

async function getJogo(req, res) {
    try {
        const jogo = await JogoService.getOuCriarJogo(req.params.idIGDB);
        return res.status(200).json(jogo);
    } catch (error) {
        return res.status(502).json({ error: "Falha ao buscar ou criar jogo", message: error.message });
    }
}

async function atualizarJogo(req, res) {
    try {
        const dadosAtualizados = req.body;
        const id = req.params.id;
        const jogoAtualizado = await JogoService.atualizarJogo(id, dadosAtualizados);
        return res.status(200).json(jogoAtualizado);
    } catch (error) {
        return res.status(400).json({ error: "Falha ao atualizar jogo", message: error.message });
    }
}

async function deletarJogo(req, res) {
    try {
        const id = req.params.id;
        const jogoDeletado = await JogoService.deletarJogo(id);
        return res.status(200).json({ jogoDeletado });
    } catch (error) {
        return res.status(400).json({ error: "Falha ao deletar jogo", message: error.message });
    }
}

const JogoController = {
    buscar,
    getJogo,
    atualizarJogo,
    deletarJogo,
    cadastrarJogo
};

export default JogoController;
