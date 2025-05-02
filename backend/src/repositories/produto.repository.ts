import { executeQuery } from "../config/database";

export class ProdutoRepository {
  getAll = async (limit: string, page: string) => {
    const skipRecords = (Number(page) - 1) * Number(limit);
    return await executeQuery(
      `select first ${limit} skip ${skipRecords} codigo,codbarra,produto,unidade,precovenda,referencia from c000025 where situacao = 0 order by codigo`,
      []
    );
  };

  getById = async (id: string) => {
    return await executeQuery(
      "select codigo,codbarra,produto,unidade,precovenda,referencia from c000025 where codigo = ? and situacao = 0",
      [id]
    );
  };
}
