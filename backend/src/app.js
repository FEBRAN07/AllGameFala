import express from "express";

import authRoutes from "./routes/auth.routes.js";

import usuarioRoutes from "./routes/usuario.routes.js";

import erroMiddleware from "./middlewares/erro.middleware.js";

import jogoRoutes from "./routes/jogo.routes.js";

import sugestaoRoutes from "./routes/sugestao.routes.js";

import reviewRoutes from "./routes/review.routes.js";

import comentarioRoutes from "./routes/comentario.routes.js";

import criarErro from "./utils/criarErro.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: "AllGameFala no ar." });
});

app.use("/api/auth", authRoutes);

app.use("/api/usuarios", usuarioRoutes);

app.use("/api/jogos", jogoRoutes);

app.use("/api/sugestao", sugestaoRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/comentarios", comentarioRoutes);

app.use((req, res, next) => {
    return next(criarErro("Rota não encontrada.", 404));
});

app.use(erroMiddleware);

export default app;
