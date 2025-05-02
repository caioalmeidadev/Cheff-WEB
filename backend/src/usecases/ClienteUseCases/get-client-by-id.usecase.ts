import { ClientesRepository } from "../../repositories/clientes.repository";

export class GetClientByIdUseCase {
    constructor(private repository: ClientesRepository) { }

    async execute(id: string) {
        return await this.repository.buscar(id);
    }
}