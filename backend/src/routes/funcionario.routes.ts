import { Router } from "express";

import funcionariosController from "../controllers/funcionarios.controller";

const funcionariosRouter = Router();

funcionariosRouter.get("/atendentes", funcionariosController.listar);

funcionariosRouter.get("/atentendes/:id", funcionariosController.porId);

export default funcionariosRouter;
