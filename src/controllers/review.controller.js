import ReviewService from "../services/review.service.js";

async function criar(req, res, next) {
    try {

        const review = await ReviewService.criar(
            req.usuario.id,
            req.body
        );

        return res.status(201).json(review);

    } catch (error) {
        next(error);
    }
}

async function listarTodas(req, res, next) {
    try {

        const reviews = await ReviewService.listarTodas();

        return res.status(200).json({
            reviews
        });

    } catch (error) {
        next(error);
    }
}

async function listarPorJogo(req, res, next) {
    try {

        const reviews = await ReviewService.listarPorJogo(
            req.params.idJogo
        );

        return res.status(200).json({
            reviews
        });

    } catch (error) {
        next(error);
    }
}

async function listarPorUsuario(req, res, next) {
    try {

        const reviews = await ReviewService.listarPorUsuario(
            req.params.idUsuario
        );

        return res.status(200).json({
            reviews
        });

    } catch (error) {
        next(error);
    }
}

async function buscarPorId(req, res, next) {
    try {

        const review = await ReviewService.buscarPorId(
            req.params.id
        );

        return res.status(200).json(review);

    } catch (error) {
        next(error);
    }
}

async function atualizar(req, res, next) {
    try {

        const review = await ReviewService.atualizar(
            req.usuario.id,
            req.params.id,
            req.body
        );

        return res.status(200).json(review);

    } catch (error) {
        next(error);
    }
}

async function remover(req, res, next) {
    try {

        await ReviewService.remover(
            req.usuario.id,
            req.params.id
        );

        return res.status(204).send();

    } catch (error) {
        next(error);
    }
}

const ReviewController = {
    criar,
    listarTodas,
    listarPorJogo,
    listarPorUsuario,
    buscarPorId,
    atualizar,
    remover,
};

export default ReviewController;