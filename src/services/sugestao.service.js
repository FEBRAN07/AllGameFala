import SugestaoRepository from "../repositories/sugestao.repository.js";
import UsuarioRepository from "../repositories/usuario.repository.js";
import criarErro from "../utils/criarErro.js";

async function validarDados(idUsuario, dados) {
    const usuario = await UsuarioRepository.buscarPorId(idUsuario);
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

async function criarSugestao(idUsuario, dados) {
    await validarDados(idUsuario, dados);
    const sugestao = await SugestaoRepository.criar({
        comentario: dados.comentario,
        nomeJogo: dados.nomeJogo,
        usuario: idUsuario,
    });
    return sugestao;
}

async function atualizarSugestao(id, status) {
    if (typeof status !== "boolean") {
        throw criarErro("Tipo do status deve ser bool", 400);
    }
    const sugestaoAtualizada = await SugestaoRepository.atualizarStatus(id, status);
    if (!sugestaoAtualizada) {
        throw criarErro("Sugestão não encontrada", 404);
    }
    return sugestaoAtualizada;
}

async function deletarSugestao(id) {
    const sugestaoDeletada = await SugestaoRepository.deletar(id);
    if (!sugestaoDeletada) {
        throw criarErro("Sugestão não encontrada", 404);
    }
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

export default SugestaoService;
