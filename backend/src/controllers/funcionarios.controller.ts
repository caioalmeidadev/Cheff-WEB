import { Request, Response, NextFunction } from "express";
import { executeQuery } from "../config/database";
import { ListarFuncionariosUsecase } from "../usecases/listar-funcionarios.usecase";
import { FuncionariosRepository } from "../repositories/funcionarios.repository";
import { GetFuncionarioPorIdUsecase } from "../usecases/get-funcionario-por-id.usecase";

class FuncionariosController {
  listar = async (request: Request, response: Response) => {
    const useCase = new ListarFuncionariosUsecase(new FuncionariosRepository());

    const atendentes = await useCase.execute();

    if (!atendentes) {
      return response
        .status(400)
        .json({ error: "Nenhum atentende cadastrado" });
    }

    return response.status(200).json({ atendentes });
  };

  porId = async (request: Request, response: Response) => {
    const { id } = request.params;

    const useCase = new GetFuncionarioPorIdUsecase(
      new FuncionariosRepository()
    );

    const atendente = await useCase.execute({ id });

    if (!atendente) {
      return response.status(404).json({ error: "Atendente não encontrado" });
    }

    return response.status(200).json({ atendente });
  };
}

export default new FuncionariosController();
