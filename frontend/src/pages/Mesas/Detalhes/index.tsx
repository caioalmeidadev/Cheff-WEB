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
import { useQuery } from '@tanstack/react-query'
import { currencyFormat, numberFormat } from '@/lib/format-number'
import { set } from 'react-hook-form'
interface MesaResponseProps {
  codigo: number
  cod_produto: string
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
  const [refresh, setRefresh] = useState(false)
  const [total, setTotal] = useState(0)

  const { data: comanda, refetch } = useQuery<MesaResponseProps[]>({
    queryKey: [`mesa-${codMesa}`],
    queryFn: async () => {
      return (await api.get(`/comandas/${codMesa}`)).data.comanda
    },
  })

  const handlePedirExtrato = async (codMesa: string) => {
    if (!codMesa) return
    try {
      await api.post(`/comandas/extrato/${codMesa}`)
      toast({ description: 'Solicitação de Extrato realizada' })
    } catch (error) {
      toast({ variant: 'destructive', description: error.toString() })
    }
  }

  const handleCancelarProduto = async (codigo: string) => {
    try {
      await api.put(`/comandas/cancelar/${codMesa}/${codigo}`, { data: codigo })
      setRefresh(true)
      refetch()
      toast({ description: 'Excluido com sucesso' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({ variant: 'destructive', description: error.toString() })
    }
  }

  useEffect(() => {
    if (comanda) {
      const total = comanda.reduce((acc, item) => {
        return acc + Number(item.total)
      }, 0)
      setTotal(total)
      setRefresh(false)
    }
  }, [comanda, refresh])
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
          {comanda &&
            comanda.map((item) => (
              <TableRow key={item.codigo}>
                <TableCell>{item.cod_produto}</TableCell>
                <TableCell className="text-sm text-nowrap">
                  <div className="flex flex-col items-start justify-start gap-1 flex-1">
                    {item.produto}
                    {item.complemento && (
                      <span className="text-xs text-muted-foreground">
                        {item.complemento}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{numberFormat(Number(item.qtde))}</TableCell>
                <TableCell>{currencyFormat(Number(item.total))}</TableCell>
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

        <span className="flex items-end ustify-content-between gap-2 sm:text-md md:text-2xl font-medium uppercase text-end">
          <span>Total da Mesa:</span>
          <span>{currencyFormat(total)}</span>
        </span>
      </div>
    </div>
  )
}
