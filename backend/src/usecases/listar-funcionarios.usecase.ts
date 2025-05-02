import { FuncionariosRepository } from "../repositories/funcionarios.repository";

export class ListarFuncionariosUsecase {
  constructor(private funcionarioRepository: FuncionariosRepository) {}

  async execute() {
    return await this.funcionarioRepository.getAll();
  }
}
