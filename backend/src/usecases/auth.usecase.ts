import AuthRepository from "../repositories/auth.repository";

interface AuthUseCaseRequest {
  usuario: string;
  senha: string;
}

interface AuthUseCaseResponse {
  codigo: string;
  nome: string;
  senha: string;
  dataRegristro: Date;
}

export class AuthUseCase {
  private authRepository: typeof AuthRepository;

  constructor(authRepository: typeof AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(request: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const user = await this.authRepository.findByUser(
      request.usuario,
      request.senha
    );

    if (!user) {
      throw new Error("Usuario e/ou senha invalidos");
    }

    return {
      codigo: user.codigo,
      nome: user.nome,
      senha: user.senha,
      dataRegristro: new Date(),
    };
  }
}
