import { Router } from "express";
import ProdutoModel from "../model/Produto/Model.js";
import ProdutoController from "../controllers/produto.controller";
import { GetByIdProductUseCase } from "../usecases/ProdutoUseCases/get-by-id-product.usecase";
import { ProdutoRepository } from "../repositories/produto.repository";

const produtoRouter = Router();

produtoRouter.get("/", ProdutoController.listar);

produtoRouter.get("/:id", ProdutoController.pesquisaPorId);

produtoRouter.get("/categorias", async (request, response) => {
  const categorias = await ProdutoModel.listarCategorias();
  console.log(categorias);
  if (!categorias) {
    return response
      .status(200)
      .send({ categorias: [{ codigo: "000001", grupo: "PADRÃO" }] });
  }
  return response.status(200).send({ categorias });
});

export default produtoRouter;
