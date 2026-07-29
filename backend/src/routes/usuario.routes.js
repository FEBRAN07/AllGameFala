import { Router } from "express";

import UsuarioController from "../controllers/usuario.controller.js";

import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();

router.get("/perfil", autenticar, UsuarioController.perfil);

router.patch("/perfil", autenticar, UsuarioController.atualizarPerfil);

router.delete("/perfil", autenticar, UsuarioController.removerMinhaConta);

export default router;
