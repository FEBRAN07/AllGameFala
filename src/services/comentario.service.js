import ComentarioRepository from "../repositories/comentario.repository.js";
import ReviewRepository from "../repositories/review.repository.js";
import criarErro from "../utils/criarErro.js";

async function criar(idUsuario, idReview, dados) {

    const { comentario } = dados;

    const reviewEncontrada = await ReviewRepository.buscarPorId(idReview);

    if (!reviewEncontrada) {
        throw criarErro("Review não encontrada.", 404);
    }

    const novoComentario = await ComentarioRepository.criar({
        usuario: idUsuario,
        reviewComentada: idReview,
        comentario,
    });

    return novoComentario;
}

async function listarPorReview(idReview) {

    const reviewEncontrada = await ReviewRepository.buscarPorId(idReview);

    if (!reviewEncontrada) {
        throw criarErro("Review não encontrada.", 404);
    }

    return await ComentarioRepository.listarPorReview(idReview);
}

async function listarPorUsuario(idUsuario) {
    return await ComentarioRepository.listarPorUsuario(idUsuario);
}

async function buscarPorId(idComentario) {

    const comentario = await ComentarioRepository.buscarPorId(idComentario);

    if (!comentario) {
        throw criarErro("Comentário não encontrado.", 404);
    }

    return comentario;
}

async function atualizar(idUsuario, idComentario, dados) {

    const comentario = await ComentarioRepository.buscarPorId(idComentario);

    if (!comentario) {
        throw criarErro("Comentário não encontrado.", 404);
    }

    if (comentario.usuario._id.toString() !== idUsuario) {
        throw criarErro("Você não pode editar este comentário.", 403);
    }

    if (dados.comentario !== undefined) {
        comentario.comentario = dados.comentario;
    }

    return await ComentarioRepository.atualizarPorId(idComentario, comentario);
}

async function remover(idUsuario, idComentario) {

    const comentario = await ComentarioRepository.buscarPorId(idComentario);

    if (!comentario) {
        throw criarErro("Comentário não encontrado.", 404);
    }

    if (comentario.usuario._id.toString() !== idUsuario) {
        throw criarErro("Você não pode excluir este comentário.", 403);
    }

    await ComentarioRepository.deletarPorId(idComentario);
}

async function curtir(idUsuario, idComentario) {

    const comentario = await ComentarioRepository.buscarPorId(idComentario);

    if (!comentario) {
        throw criarErro("Comentário não encontrado.", 404);
    }

    const jaCurtiu = comentario.likes.some(
        (idLike) => idLike.toString() === idUsuario
    );

    if (jaCurtiu) {
        throw criarErro("Você já curtiu este comentário.", 400);
    }

    return await ComentarioRepository.adicionarLike(idComentario, idUsuario);
}

async function descurtir(idUsuario, idComentario) {

    const comentario = await ComentarioRepository.buscarPorId(idComentario);

    if (!comentario) {
        throw criarErro("Comentário não encontrado.", 404);
    }

    const curtiu = comentario.likes.some(
        (idLike) => idLike.toString() === idUsuario
    );

    if (!curtiu) {
        throw criarErro("Você ainda não curtiu este comentário.", 400);
    }

    return await ComentarioRepository.removerLike(idComentario, idUsuario);
}

const ComentarioService = {
    criar,
    listarPorReview,
    listarPorUsuario,
    buscarPorId,
    atualizar,
    remover,
    curtir,
    descurtir,
};

export default ComentarioService;