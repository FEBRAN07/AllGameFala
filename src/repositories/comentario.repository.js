import Comentario from "../models/comentario.model.js";

async function criar(dados) {
    return await Comentario.create(dados);
}

async function listarPorReview(idReview) {
    return await Comentario.find({ reviewComentada: idReview })
        .populate("usuario", "nome fotoPerfil")
        .sort({ createdAt: -1 });
}

async function listarPorUsuario(idUsuario) {
    return await Comentario.find({ usuario: idUsuario })
        .populate("usuario", "nome fotoPerfil")
        .populate("reviewComentada")
        .sort({ createdAt: -1 });
}

async function buscarPorId(id) {
    return await Comentario.findById(id)
        .populate("usuario", "nome fotoPerfil")
        .populate("reviewComentada");
}

async function atualizarPorId(id, dados) {
    return await Comentario.findByIdAndUpdate(id, dados, {
        new: true,
        runValidators: true,
    }).populate("usuario", "nome fotoPerfil");
}

async function deletarPorId(id) {
    return await Comentario.findByIdAndDelete(id);
}

async function deletarPorReview(idReview) {
    return await Comentario.deleteMany({ reviewComentada: idReview });
}

async function deletarPorUsuario(idUsuario) {
    return await Comentario.deleteMany({ usuario: idUsuario });
}

async function adicionarLike(idComentario, idUsuario) {
    return await Comentario.findByIdAndUpdate(
        idComentario,
        { $addToSet: { likes: idUsuario } },
        { new: true }
    ).populate("usuario", "nome fotoPerfil");
}

async function removerLike(idComentario, idUsuario) {
    return await Comentario.findByIdAndUpdate(
        idComentario,
        { $pull: { likes: idUsuario } },
        { new: true }
    ).populate("usuario", "nome fotoPerfil");
}

const ComentarioRepository = {
    criar,
    listarPorReview,
    listarPorUsuario,
    buscarPorId,
    atualizarPorId,
    deletarPorId,
    deletarPorReview,
    deletarPorUsuario,
    adicionarLike,
    removerLike,
};

export default ComentarioRepository;