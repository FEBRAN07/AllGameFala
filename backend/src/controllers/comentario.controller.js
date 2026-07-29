import ComentarioService from "../services/comentario.service.js";

async function criar(req, res, next) {
    try {

        const comentario = await ComentarioService.criar(
            req.usuario.id,
            req.params.idReview,
            req.body
        );

        return res.status(201).json(comentario);

    } catch (error) {
        next(error);
    }
}

async function listarPorReview(req, res, next) {
    try {

        const comentarios = await ComentarioService.listarPorReview(
            req.params.idReview
        );

        return res.status(200).json({
            comentarios
        });

    } catch (error) {
        next(error);
    }
}

async function listarPorUsuario(req, res, next) {
    try {

        const comentarios = await ComentarioService.listarPorUsuario(
            req.params.idUsuario
        );

        return res.status(200).json({
            comentarios
        });

    } catch (error) {
        next(error);
    }
}

async function buscarPorId(req, res, next) {
    try {

        const comentario = await ComentarioService.buscarPorId(
            req.params.id
        );

        return res.status(200).json(comentario);

    } catch (error) {
        next(error);
    }
}

async function atualizar(req, res, next) {
    try {

        const comentario = await ComentarioService.atualizar(
            req.usuario.id,
            req.params.id,
            req.body
        );

        return res.status(200).json(comentario);

    } catch (error) {
        next(error);
    }
}

async function remover(req, res, next) {
    try {

        await ComentarioService.remover(
            req.usuario.id,
            req.params.id
        );

        return res.status(204).send();

    } catch (error) {
        next(error);
    }
}

async function curtir(req, res, next) {
    try {

        const comentario = await ComentarioService.curtir(
            req.usuario.id,
            req.params.id
        );

        return res.status(200).json(comentario);

    } catch (error) {
        next(error);
    }
}

async function descurtir(req, res, next) {
    try {

        const comentario = await ComentarioService.descurtir(
            req.usuario.id,
            req.params.id
        );

        return res.status(200).json(comentario);

    } catch (error) {
        next(error);
    }
}

const ComentarioController = {
    criar,
    listarPorReview,
    listarPorUsuario,
    buscarPorId,
    atualizar,
    remover,
    curtir,
    descurtir,
};

export default ComentarioController;