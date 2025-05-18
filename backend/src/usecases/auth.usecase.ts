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


  constructor(private authRepository: typeof AuthRepository) {
  }

  async execute(request: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    console.log(request);
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
      senha: user.senha_app,
      dataRegristro: new Date(),
    };
  }
}
