import { FuncionariosRepository } from "../repositories/funcionarios.repository";

interface GetFuncionarioPorIdUseCaseRequest {
  id: string;
}
export class GetFuncionarioPorIdUsecase {
  constructor(private funcionarioRepository: FuncionariosRepository) {}
  async execute({ id }: GetFuncionarioPorIdUseCaseRequest) {
    return await this.funcionarioRepository.findById(id);
  }
}
