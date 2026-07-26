import SugestaoRepository from "../repositories/sugestao.repository.js";
import UsuarioRepository from "../repositories/usuario.repository.js";
import criarErro from "../utils/criarErro.js";

async function validarDados(dados) {
    const id = dados.usuario;
    const usuario = await UsuarioRepository.buscarPorId(id);
    if (!usuario) {
        throw criarErro("Usuario não encontrado", 404);
    }
    const comentario = dados.comentario;
    if (!comentario) {
        throw criarErro("Comentário é obrigatório", 400);
    }
    const nomeJogo = dados.nomeJogo;
    if (!nomeJogo) {
        throw criarErro("Nome do jogo é obrigatório", 400);
    }
}

async function criarSugestao(dados) {
    validarDados(dados);
    const sugestao = await SugestaoRepository.criar(dados);
    return sugestao;
}

async function atualizarSugestao(id, status) {
    if (typeof status !== "boolean") {
        throw criarErro("Tipo do status deve ser bool", 400);
    }
    const sugestaoAtualizada = await SugestaoRepository.atualizarStatus(id, status);
    return sugestaoAtualizada;
}

async function deletarSugestao(id) {
    const sugestaoDeletada = await SugestaoRepository.deletar(id);
    return sugestaoDeletada;
}

async function listarSugestoes() {
    const sugestoes = await SugestaoRepository.listar();
    return sugestoes;
}

const SugestaoService = {
    criarSugestao,
    atualizarSugestao,
    deletarSugestao,
    listarSugestoes,
};
