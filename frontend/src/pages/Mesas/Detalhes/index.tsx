import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import api from '@/services/api.ts'
import { useToast } from '@/components/ui/use-toast'
import {
  MinusCircleIcon,
  PenSquare,
  PlusCircleIcon,
  ReceiptIcon,
  Trash,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface MesaResponseProps {
  codigo: number
  codProduto: string
  produto: string
  complemento: string
  unidade: string
  qtde: number
  unitario: number
  total: string
}

export function MesaDetalhes() {
  const { codMesa } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [pedido, setPedido] = useState<MesaResponseProps[]>([])
  const [refresh, setRefresh] = useState(false)
  const [total, setTotal] = useState(0)

  const loadPedido = async () => {
    const response = await api.get(`/comandas/${codMesa}`)

    console.log(response.data.comanda)

    setPedido(response.data.comanda)

    setTotal(() => {
      return pedido.reduce(
        (acc: number, item: MesaResponseProps) => acc + Number(item.total),
        0,
      )
    })
  }

  const handlePedirExtrato = async (codMesa: string) => {
    if (!codMesa) return
    try {
      await api.post(`/comandas/extrato/${codMesa}`)
      toast({ description: 'Solicitação de Extrato realizada' })
    } catch (error: any) {
      toast({ variant: 'destructive', description: error.toString() })
    }
  }

  const handleCancelarProduto = async (codigo: string) => {
    try {
      await api.put(`/comandas/cancelar/${codMesa}/${codigo}`, { data: codigo })
      setRefresh(true)
      toast({ description: 'Excluido com sucesso' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({ variant: 'destructive', description: error.toString() })
    }
  }

  useEffect(() => {
    ;(async () => loadPedido())()
    setRefresh(false)
  }, [loadPedido, refresh])

  return (
    <div className="flex flex-col gap-2 py-2 items-center justify-start w-full min-h-screen">
      {/* <DataTable columns={columns} data={pedido} /> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Qtde</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pedido.map((item) => (
            <TableRow key={item.codigo}>
              <TableCell>{item.codProduto}</TableCell>
              <TableCell className="text-sm text-nowrap">
                {item.produto}
              </TableCell>
              <TableCell>{item.qtde}</TableCell>
              <TableCell>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(item.total))}
              </TableCell>
              <TableCell>
                <>
                  <div className="max-sm:hidden md:flex md:items-center md:justify-start md:gap-1 ">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() =>
                        navigate(
                          `/mesas/${codMesa}/pedido/editar/${item.codigo}`,
                        )
                      }
                    >
                      <PenSquare className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() =>
                        handleCancelarProduto(item.codigo.toString())
                      }
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="sm:hidden flex flex-col items-center justify-start gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        navigate(
                          `/mesas/${codMesa}/pedido/editar/${item.codigo}`,
                        )
                      }
                    >
                      <PenSquare className="w-2 h-2" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        handleCancelarProduto(item.codigo.toString())
                      }
                    >
                      <Trash className="w-2 h-2" />
                    </Button>
                  </div>
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-around gap-2 w-full mt-4">
        <div className="grid md:grid-cols-3 sx:grid-cols-1 gap-2">
          <Button
            onClick={() => navigate(`/mesas/${codMesa}/pedido/adicionar`)}
          >
            <PlusCircleIcon size={16} className="mr-1" />
            Adicionar
          </Button>
          <Button variant="destructive" onClick={() => navigate('/')}>
            <MinusCircleIcon size={16} className="mr-1" />
            Voltar
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePedirExtrato(codMesa || '')}
          >
            {' '}
            <ReceiptIcon size={16} className="mr-1" /> Extrato
          </Button>
        </div>

        <span className="sm:text-md md:text-2xl font-medium uppercase text-end">
          Total da Mesa:{' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total)}
        </span>
      </div>
    </div>
  )
}
