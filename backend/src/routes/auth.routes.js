import { Router } from "express";

import AuthController from "../controllers/auth.controller.js";

import validarCampos from "../middlewares/validarCampos.middleware.js";

const router = Router();

router.post("/cadastro", validarCampos.validarCadastro, AuthController.cadastrar);

router.post("/login", validarCampos.validarLogin, AuthController.login);

export default router;
