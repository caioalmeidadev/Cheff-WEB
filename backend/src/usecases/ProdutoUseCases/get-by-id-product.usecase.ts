import { ProdutoRepository } from "../../repositories/produto.repository";

export class GetByIdProductUseCase {
  constructor(private repository: ProdutoRepository) {}

  async execute(id: string) {
    return await this.repository.getById(id);
  }
}
