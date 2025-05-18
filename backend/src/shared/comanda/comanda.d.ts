export type TProdutoPedidoProps = {
    codigo: string
    qtde: string
    valUnitario: string
    valTotal: string
    complemento: string
}

export type TProdutoLancarProps = TProdutoPedidoProps & {
    codMesa: number
}