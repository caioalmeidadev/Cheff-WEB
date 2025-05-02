import { ProdutoRepository } from "../../repositories/produto.repository";

export class GetCategoriesUseCase {
    constructor(private repository: ProdutoRepository) { }

    async execute() {
        return await this.repository.listarCategorias();
    }
}