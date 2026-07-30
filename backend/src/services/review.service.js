import ReviewRepository from "../repositories/review.repository.js";
import JogoRepository from "../repositories/jogo.repository.js";
import ComentarioRepository from "../repositories/comentario.repository.js";
import criarErro from "../utils/criarErro.js";

const INTERVALO_MINIMO_ENTRE_REVIEWS_MS = 24 * 60 * 60 * 1000;

async function atualizarNotaMedia(idJogo) {
    const reviews = await ReviewRepository.listarPorJogo(idJogo);

    if (reviews.length === 0) {
        const jogo = await JogoRepository.buscarPorIdNosso(idJogo);

        jogo.notaMedia = 0;
        jogo.quantidadeReviews = 0;

        await JogoRepository.salvar(jogo);

        return;
    }

    const soma = reviews.reduce((acc, review) => acc + review.nota, 0);

    const media = Number((soma / reviews.length).toFixed(2));

    const jogo = await JogoRepository.buscarPorIdNosso(idJogo);

    jogo.notaMedia = media;
    jogo.quantidadeReviews = reviews.length;

    await JogoRepository.salvar(jogo);
}

async function criar(idUsuario, dados) {
    const { jogo, nota, comentario } = dados;

    if (nota < 0 || nota > 5) {
        throw criarErro("A nota deve estar entre 0 e 5.", 400);
    }

    const jogoEncontrado = await JogoRepository.buscarPorIdNosso(jogo);

    if (!jogoEncontrado) {
        throw criarErro("Jogo não encontrado.", 404);
    }

    const ultimaReview = await ReviewRepository.buscarUltimaPorUsuarioEJogo(idUsuario, jogo);

    if (ultimaReview) {
        const tempoDecorrido = Date.now() - ultimaReview.createdAt.getTime();

        if (tempoDecorrido < INTERVALO_MINIMO_ENTRE_REVIEWS_MS) {
            const tempoRestanteMs = INTERVALO_MINIMO_ENTRE_REVIEWS_MS - tempoDecorrido;
            const horasRestantes = Math.ceil(tempoRestanteMs / (60 * 60 * 1000));

            throw criarErro(
                `Você já avaliou este jogo recentemente. Tente novamente em cerca de ${horasRestantes}h.`,
                429
            );
        }
    }

    const review = await ReviewRepository.criar({
        usuario: idUsuario,
        jogo,
        nota,
        comentario,
    });

    await atualizarNotaMedia(jogo);

    return review;
}

async function listarTodas() {
    return await ReviewRepository.listarTodas();
}

async function listarPorJogo(idJogo) {
    const jogo = await JogoRepository.buscarPorIdNosso(idJogo);

    if (!jogo) {
        throw criarErro("Jogo não encontrado.", 404);
    }

    return await ReviewRepository.listarPorJogo(idJogo);
}

async function listarPorUsuario(idUsuario) {
    return await ReviewRepository.listarPorUsuario(idUsuario);
}

async function buscarPorId(idReview) {
    const review = await ReviewRepository.buscarPorId(idReview);

    if (!review) {
        throw criarErro("Review não encontrada.", 404);
    }

    return review;
}

async function atualizar(idUsuario, idReview, dados) {
    const review = await ReviewRepository.buscarPorId(idReview);

    if (!review) {
        throw criarErro("Review não encontrada.", 404);
    }

    if (review.usuario._id.toString() !== idUsuario) {
        throw criarErro("Você não pode editar esta review.", 403);
    }

    if (dados.nota !== undefined) {
        if (dados.nota < 0 || dados.nota > 5) {
            throw criarErro("A nota deve estar entre 0 e 5.", 400);
        }

        review.nota = dados.nota;
    }

    if (dados.comentario !== undefined) {
        review.comentario = dados.comentario;
    }

    const reviewAtualizada = await ReviewRepository.atualizarPorId(idReview, review);

    await atualizarNotaMedia(review.jogo._id);

    return reviewAtualizada;
}

async function remover(idUsuario, idReview) {
    const review = await ReviewRepository.buscarPorId(idReview);

    if (!review) {
        throw criarErro("Review não encontrada.", 404);
    }

    if (review.usuario._id.toString() !== idUsuario) {
        throw criarErro("Você não pode excluir esta review.", 403);
    }

    const idJogo = review.jogo._id;

    await ComentarioRepository.deletarPorReview(idReview);

    await ReviewRepository.deletarPorId(idReview);

    await atualizarNotaMedia(idJogo);
}

async function curtir(idUsuario, idReview) {
    const review = await ReviewRepository.buscarPorId(idReview);

    if (!review) {
        throw criarErro("Review não encontrada.", 404);
    }

    const jaCurtiu = review.likes.some((idLike) => idLike.toString() === idUsuario);

    if (jaCurtiu) {
        throw criarErro("Você já curtiu esta review.", 400);
    }

    return await ReviewRepository.adicionarLike(idReview, idUsuario);
}

async function descurtir(idUsuario, idReview) {
    const review = await ReviewRepository.buscarPorId(idReview);

    if (!review) {
        throw criarErro("Review não encontrada.", 404);
    }

    const curtiu = review.likes.some((idLike) => idLike.toString() === idUsuario);

    if (!curtiu) {
        throw criarErro("Você ainda não curtiu esta review.", 400);
    }

    return await ReviewRepository.removerLike(idReview, idUsuario);
}

async function removerPorJogo(idJogo) {
    const reviews = await ReviewRepository.listarPorJogo(idJogo);

    for (const review of reviews) {
        await ComentarioRepository.deletarPorReview(review._id);
    }

    await ReviewRepository.deletarPorJogo(idJogo);
}

async function removerPorUsuario(idUsuario) {
    const reviews = await ReviewRepository.listarPorUsuario(idUsuario);

    const jogosAfetados = new Set();

    for (const review of reviews) {
        await ComentarioRepository.deletarPorReview(review._id);
        jogosAfetados.add(review.jogo._id.toString());
    }

    await ReviewRepository.deletarPorUsuario(idUsuario);

    for (const idJogo of jogosAfetados) {
        await atualizarNotaMedia(idJogo);
    }
}

const ReviewService = {
    criar,
    listarTodas,
    listarPorJogo,
    listarPorUsuario,
    buscarPorId,
    atualizar,
    remover,
    curtir,
    descurtir,
    removerPorJogo,
    removerPorUsuario,
};

export default ReviewService;
