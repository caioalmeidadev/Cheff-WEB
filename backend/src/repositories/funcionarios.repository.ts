import { executeQuery } from "../config/database";

export class FuncionariosRepository {
  findById = async (id: string) =>
    await executeQuery(
      "select codigo,nome from c000008 where f_vendedor = 1 and codigo = :id",
      [id]
    );
  getAll = async () =>
    await executeQuery(
      "select codigo,nome from c000008 where f_vendedor = 1",
      []
    );
}
