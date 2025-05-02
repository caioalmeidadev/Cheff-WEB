import { executeQuery, executeCommand } from "../config/database";
import { ClienteProps } from "../shared/cliente/cliente.type";

export class ClientesRepository {
    listar = async () => {
        try {
            return await executeQuery("select * from c000007 order by codigo", []);
        } catch (err) {
            console.log(err);
        }
    }

    buscar = async (id: string) => {
        return await executeQuery("select * from c000007 where codigo = ?", [id]);
    }

    registar = async (cliente: ClienteProps) => {
        const { codigo, nome, cpf } = cliente;
        return await executeCommand(
            "insert into c000007 (nome,endereco,telefone,email) values (?,?,?)",
            [codigo, nome, cpf]
        );
    }
}