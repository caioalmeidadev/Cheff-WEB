import { Router } from "express";
import ProdutoController from "../controllers/produto.controller";

const produtoRouter = Router();

produtoRouter.get("/", ProdutoController.listar);

produtoRouter.get("/:id", ProdutoController.pesquisaPorId);

produtoRouter.get("/categorias", ProdutoController.listarCategorias);

export default produtoRouter;
