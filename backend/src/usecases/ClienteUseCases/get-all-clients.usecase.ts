import { ClientesRepository } from "../../repositories/clientes.repository";

export class GetAllClientsUseCase {
    constructor(private repository: ClientesRepository) { }

    async execute() {
        return await this.repository.listar();
    }
}