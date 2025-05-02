import { Router } from "express"
import clienteController from "../controllers/cliente.controller"

const clientesRouter = Router();

clientesRouter.get('/', clienteController.listar)

clientesRouter.get('/:id', clienteController.pesquisaPorId)

export default clientesRouter;