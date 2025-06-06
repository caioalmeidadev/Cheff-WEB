import { executeQuery, executeCommand } from "../config/database";
import { TProdutoLancarProps, TProdutoPedidoProps } from "../shared/comanda/comanda";

export class ComandaRepository {
    async listar(codMesa: string) {
        return await executeQuery(
            "select C.*,P.PRODUTO,P.UNIDADE from r000002 C inner join c000025 P on(P.CODIGO = C.COD_PRODUTO) where cod_mesa = ? and cancelado = 0",
            [codMesa],
        );
    }

    async cancelarProduto(codigo: string) {
        await executeCommand("UPDATE R000002 SET CANCELADO = 1 WHERE CODIGO = ?", [
            codigo,
        ]);
    }
    async cancelarMesa(codMesa: string) {
        const temProduto = await executeQuery(
            "select * from r000002 where cancelado = 0 and cod_mesa = ?",
            [codMesa],
        );

        if (temProduto) {
            if (temProduto?.length < 1) {
                await this.LimparMesa(codMesa);
            }
        }
    }
    async LimparMesa(codMesa: string) {
        await executeCommand("delete from r000002 where cod_mesa = ?", [codMesa]);
        await executeCommand("delete from r000001 where codigo = ?", [codMesa]);
    }
    async lancarProduto({
        codMesa,
        codigo,
        qtde,
        valUnitario,
        valTotal,
        complemento,
    }: TProdutoLancarProps) {
        const codigoCerto = String(codigo).padStart(6, "0");
        const mesaAberta = await executeQuery(
            "select * from r000001 where codigo = ?",
            [codMesa],
        );
        if (!mesaAberta || mesaAberta.length === 0) {
            await executeCommand("INSERT INTO R000001(CODIGO)VALUES(?)", [codMesa]);
        }
        await executeCommand(
            "INSERT INTO R000002 (COD_MESA, COD_PRODUTO, QTDE, UNITARIO, TOTAL, COMPLEMENTO, TRANSF_MESA, CANCELADO, IMPRESSO) VALUES (?,?,?,?,?,?,null,0,0)",
            [
                codMesa,
                codigoCerto,
                qtde,
                valUnitario,
                valTotal,
                complemento,
            ],
        );
    }
    async editarProduto({
        codigo,
        qtde,
        valUnitario,
        valTotal,
        complemento,
    }: TProdutoPedidoProps) {
        await executeCommand(
            "UPDATE R000002 SET QTDE = ?, UNITARIO = ?, TOTAL = ?, COMPLEMENTO = ? WHERE CODIGO = ?",
            [qtde, valUnitario, valTotal, complemento, codigo],
        );
    }
    async listarEdicao({
        codMesa,
        codigo,
    }: {
        codMesa: string;
        codigo: string;
    }) {
        return await executeQuery(
            "select c.*, p.produto descricao from r000002 c inner join c000025 p on (p.codigo = c.cod_produto) where  c.codigo = ? and c.cod_mesa = ?",
            [codigo, codMesa],
        );
    }
    async extrato(codMesa: string) {
        return await executeQuery(
            "select C.*,P.PRODUTO,P.UNIDADE from r000002 C inner join c000025 P on(P.CODIGO = C.COD_PRODUTO) where cod_mesa = ? and cancelado = 0",
            [codMesa],
        );
    }
    async listarComandas() {
        return await executeQuery(
            "select C.*,P.PRODUTO,P.UNIDADE from r000002 C inner join c000025 P on(P.CODIGO = C.COD_PRODUTO) where cancelado = 0",
            [],
        );
    }
    async listarComandasCanceladas() {
        return await executeQuery(
            "select C.*,P.PRODUTO,P.UNIDADE from r000002 C inner join c000025 P on(P.CODIGO = C.COD_PRODUTO) where cancelado = 1",
            [],
        );
    }
    async listarComandasPorMesa(codMesa: string) {
        return await executeQuery(
            "select C.*,P.PRODUTO,P.UNIDADE from r000002 C inner join c000025 P on(P.CODIGO = C.COD_PRODUTO) where cod_mesa = ? and cancelado = 0",
            [codMesa],
        );
    }
    async listarComandasCanceladasPorMesa(codMesa: string) {
        return await executeQuery(
            "select C.*,P.PRODUTO,P.UNIDADE from r000002 C inner join c000025 P on(P.CODIGO = C.COD_PRODUTO) where cod_mesa = ? and cancelado = 1",
            [codMesa],
        );
    }
    async listarComandasPorFuncionario(codFuncionario: string) {
        return await executeQuery(
            "select C.*,P.PRODUTO,P.UNIDADE from r000002 C inner join c000025 P on(P.CODIGO = C.COD_PRODUTO) where cod_funcionario = ? and cancelado = 0",
            [codFuncionario],
        );
    }
    async listarComandasCanceladasPorFuncionario(codFuncionario: string) {
        return await executeQuery(
            "select C.*,P.PRODUTO,P.UNIDADE from r000002 C inner join c000025 P on(P.CODIGO = C.COD_PRODUTO) where cod_funcionario = ? and cancelado = 1",
            [codFuncionario],
        );
    }
}