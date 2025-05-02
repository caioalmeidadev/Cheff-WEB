import { ProdutoRepository } from "../../repositories/produto.repository";

export class GetAllProductsUseCase {
  constructor(private repository: ProdutoRepository) {}
  async execute(limit: string, page: string) {
    return await this.repository.getAll(limit, page);
  }
}
