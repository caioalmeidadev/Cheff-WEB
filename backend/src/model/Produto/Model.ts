import { executeQuery } from "../../config/database.js";

class Produto {
  async tamanho() {
    return await executeQuery(
      "select count(codigo) from c000025 where situacao = 0",
      []
    );
  }

  async listarCategorias() {
    return await executeQuery("select codigo,grupo from c000017", []);
  }
}

export default new Produto();
