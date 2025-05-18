import { executeQuery } from "../config/database";

export class MesaRepository {
    async findById(id: string) {
        return await executeQuery(
            "SELECT codigo, nome FROM c000008 WHERE f_vendedor = 1 AND codigo = :id",
            [id]
        );
    }

    async getAll() {
        return await executeQuery(
            "SELECT codigo, nome FROM c000008 WHERE f_vendedor = 1",
            []
        );
    }
}
export default new MesaRepository();