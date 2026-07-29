function erroMiddleware(error, req, res, next) {
    if (error.name === "ValidationError") {
        const mensagens = Object.values(error.errors).map((erro) => erro.message);

        return res.status(400).json({ message: mensagens.join(" ") });
    }

    if (error.name === "CastError") {
        return res.status(400).json({ message: "ID inválido." });
    }

    if (error.code === 11000) {
        const campo = error.keyValue ? Object.keys(error.keyValue)[0] : null;

        const mensagens = {
            email: "Email já cadastrado.",
            idIGDB: "Este jogo já está cadastrado.",
        };

        const message = mensagens[campo] || `Valor duplicado para o campo '${campo}'.`;

        return res.status(409).json({ message });
    }

    let status = error.status;

    if (!status) {
        status = 500;
    }

    const message = error.message;

    if (status >= 500) {
        console.error(error);
    }

    return res.status(status).json({ message });
}

export default erroMiddleware;
