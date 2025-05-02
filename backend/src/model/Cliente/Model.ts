import { executeCommand, executeQuery } from "../../config/database.js";

interface ClienteProps {
  codigo: string;
  nome: string;
  cpf: string;
}

class Cliente {
  async listar() {
    try {
      return await executeQuery("select * from c000007 order by codigo", []);
    } catch (err) {
      console.log(err);
    }
  }

  async mostrar(id: string) {
    return await executeQuery("select * from c000007 where codigo = ?", [id]);
  }

  async registar(cliente: ClienteProps) {
    const { codigo, nome, cpf } = cliente;
    return await executeCommand(
      "insert into c000007 (nome,endereco,telefone,email) values (?,?,?)",
      [codigo, nome, cpf]
    );
  }
}

export default new Cliente();
