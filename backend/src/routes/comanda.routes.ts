import { Router } from "express";
import comandasController from "../controllers/comandas.controller";

const comandaRouter = Router();

comandaRouter.get("/:codMesa", comandasController.listar);

comandaRouter.post('/:codMesa', comandasController.lancarProduto)

comandaRouter.put('/cancelar/:codMesa/:codigo', comandasController.cancelarProduto)

comandaRouter.put('/:codMesa/editar/:codigo', comandasController.editarProduto)

comandaRouter.get('/:codMesa/editar/:codigo', comandasController.listarEditar)

comandaRouter.post('/extrato/:codMesa', comandasController.extratoComanda)

export default comandaRouter
