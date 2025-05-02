import * as z from "zod";
import { AuthUseCase } from "../usecases/auth.usecase";
import authRepository from "../repositories/auth.repository";
import { Request, Response, NextFunction } from "express";

const loginBodySchema = z.object({
  usuario: z.string(),
  senha: z.string(),
});

export const AuthRegister = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { usuario, senha } = loginBodySchema.parse(request.body);

  try {
    const authUseCase = new AuthUseCase(authRepository);

    const _usuario = await authUseCase.execute({ usuario, senha });

    if (!_usuario) {
      return response
        .status(403)
        .json({ error: "Usuario e/ou senha invalidos" });
    }
    return response.status(200).send({ _usuario });
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Ocorreu um erro ao realizar login" });
  }
};
