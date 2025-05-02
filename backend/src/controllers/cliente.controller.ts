import { Request, Response } from "express";
import { ClientesRepository } from "../repositories/clientes.repository";
import { GetAllClientsUseCase } from "../usecases/ClienteUseCases/get-all-clients.usecase";

class ClienteController {
    constructor(private clientesRepository: ClientesRepository) { }

    async listar(req: Request, res: Response) {
        const useCase = new GetAllClientsUseCase(this.clientesRepository);
        const clientes = await useCase.execute();
        if (!clientes) {
            return res.status(400).send({ error: "Não há clientes cadastrados" });
        }
        return res.status(200).send({ clientes });
    }

    async pesquisaPorId(req: Request, res: Response) {
        const { id } = req.params;
        const cliente = await this.clientesRepository.buscar(id);
        if (!cliente) {
            return res.status(400).send({ error: "Cliente não encontrado" });
        }
        return res.status(200).send({ cliente });
    }
}

export default new ClienteController(new ClientesRepository());