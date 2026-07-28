import Review from "../models/review.model.js";

async function criar(dados) {
    return await Review.create(dados);
}

async function listarTodas() {
    return await Review.find()
        .populate("usuario", "nome fotoPerfil")
        .populate("jogo", "titulo capa")
        .sort({ createdAt: -1 });
}

async function listarPorJogo(idJogo) {
    return await Review.find({ jogo: idJogo })
        .populate("usuario", "nome fotoPerfil")
        .populate("jogo", "titulo capa")
        .sort({ createdAt: -1 });
}

async function listarPorUsuario(idUsuario) {
    return await Review.find({ usuario: idUsuario })
        .populate("usuario", "nome fotoPerfil")
        .populate("jogo", "titulo capa")
        .sort({ createdAt: -1 });
}

async function buscarPorId(id) {
    return await Review.findById(id)
        .populate("usuario", "nome fotoPerfil")
        .populate("jogo", "titulo capa");
}

async function atualizarPorId(id, dados) {
    return await Review.findByIdAndUpdate(id, dados, {
        new: true,
        runValidators: true,
    })
        .populate("usuario", "nome fotoPerfil")
        .populate("jogo", "titulo capa");
}

async function deletarPorId(id) {
    return await Review.findByIdAndDelete(id);
}

async function deletarPorJogo(idJogo) {
    return await Review.deleteMany({ jogo: idJogo });
}

async function adicionarLike(idReview, idUsuario) {
    return await Review.findByIdAndUpdate(
        idReview,
        { $addToSet: { likes: idUsuario } },
        { new: true }
    )
        .populate("usuario", "nome fotoPerfil")
        .populate("jogo", "titulo capa");
}

async function removerLike(idReview, idUsuario) {
    return await Review.findByIdAndUpdate(
        idReview,
        { $pull: { likes: idUsuario } },
        { new: true }
    )
        .populate("usuario", "nome fotoPerfil")
        .populate("jogo", "titulo capa");
}

const ReviewRepository = {
    criar,
    listarTodas,
    listarPorJogo,
    listarPorUsuario,
    buscarPorId,
    atualizarPorId,
    deletarPorId,
    deletarPorJogo,
    adicionarLike,
    removerLike,
};

export default ReviewRepository;