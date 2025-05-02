import { Request, Response } from "express";
import { GetAllProductsUseCase } from "../usecases/ProdutoUseCases/get-all-products.usecase";
import { ProdutoRepository } from "../repositories/produto.repository";
import { GetByIdProductUseCase } from "../usecases/ProdutoUseCases/get-by-id-product.usecase";
import { GetCategoriesUseCase } from "../usecases/ProdutoUseCases/get-categories.usecase";

class ProdutoController {
  listar = async (request: Request, response: Response) => {
    const { page, limit } = request.query;

    const totalRec = limit?.toString() || "10";

    const pageSize = page?.toString() || "1";
    const useCase = new GetAllProductsUseCase(new ProdutoRepository());
    const produtos = await useCase.execute(totalRec, pageSize);

    if (!produtos) {
      return response
        .status(400)
        .send({ error: "Não há produtos cadastrados" });
    }

    const totalRecords = produtos.length

    return response
      .status(200)
      .send({ produtos, totalRecords: totalRecords });
  };

  pesquisaPorId = async (request: Request, response: Response) => {
    const { id } = request.params;

    const useCase = new GetByIdProductUseCase(new ProdutoRepository());

    const produto = await useCase.execute(id);

    if (!produto) {
      return response.status(400).send({ error: "Produto não encontrado" });
    }
    return response.status(200).send({ produto });
  };

  listarCategorias = async (request: Request, response: Response) => {
    const useCase = new GetCategoriesUseCase(new ProdutoRepository());
    const categorias = await useCase.execute();

    if (!categorias) {
      return response
        .status(400)
        .send({ error: "Não há categorias cadastradas" });
    }

    return response.status(200).send({ categorias });
  };
}

export default new ProdutoController();
