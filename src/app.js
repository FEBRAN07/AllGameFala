import express from "express";

import authRoutes from "./routes/auth.routes.js";

import usuarioRoutes from "./routes/usuario.routes.js";

import erroMiddleware from "./middlewares/erro.middleware.js";

import jogoRoutes from "./routes/jogo.routes.js";

import criarErro from "./utils/criarErro.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Boilerplate API MVC está rodando." });
});

app.use("/api/auth", authRoutes);

app.use("/api/usuarios", usuarioRoutes);

app.use("/api/jogos", jogoRoutes);

app.use((req, res, next) => {
    return next(criarErro("Rota não encontrada.", 404));
});

app.use(erroMiddleware);

export default app;
