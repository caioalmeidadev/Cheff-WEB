import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import api from '@/services/api.ts'
import { Button } from '../ui/button'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { useQuery } from '@tanstack/react-query'
import { currencyFormat } from '@/lib/format-number'
import { TProduto } from '@/@shared/produto'

type SearchPageProps = {
  onSelectedValue: (item: TProduto) => void
}

export function Search({ onSelectedValue }: SearchPageProps) {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [pages, setPages] = useState(1)

  const { data: produtos } = useQuery({
    queryKey: [`produtos-search`],
    queryFn: async () => {
      const response = await api.get(`/produtos?page=${page}&limit=${limit}`)
      return response.data.produtos
    },
    enabled: open,
  })

  const handleCancel = () => {
    setPage(1)
  }

  const handleSelection = (item: TProduto) => {
    onSelectedValue(item)
    setPage(1)
    setOpen(false)
  }

  function handleNextPage() {
    setPage(page + 1)
  }
  function handlePrevPage() {
    setPage(page - 1)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="link">
          <SearchIcon className="h-6 w-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[520px] max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Pesquisa de Produtos</AlertDialogTitle>
          <AlertDialogDescription>
            Escolha um produto para adicionar no pedido
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" flex flex-col gap-2 overflow-auto">
          {produtos &&
            produtos.map((item: TProduto) => (
              <Card
                key={item.codigo}
                onClick={() => handleSelection(item)}
                className="bg-primary text-muted"
              >
                <CardContent className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-light">{item.codigo}</div>
                    <div className="text-xs font-semibold">{item.codbarra}</div>
                  </div>
                  <div className="text-md text-nowrap font-bold">
                    {item.produto}
                  </div>
                  <div className="flex items-center justify-around">
                    <div className="text-xs">{item.unidade}</div>
                    <div className="text-sm font-medium">
                      {currencyFormat(item.precovenda)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
        {/* <Table >
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Cod. Barras</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>Preço</TableHead>
                  </TableRow>
                  </TableHeader> 
                  <TableBody className="overflow-y-auto">
                    {produtos && produtos.map((item : ListItemDetailsProps)  => (<TableRow key={item.codigo} onClick={() => handleSelection(item.codigo)}>
                      <TableCell className="text-xs">{item.codigo}</TableCell>
                      <TableCell className="text-xs">{item.codbarra}</TableCell>
                      <TableCell className='text-xs text-nowrap'>{item.produto}</TableCell>
                      <TableCell className="text-xs">{item.unidade}</TableCell>
                      <TableCell className="text-xs">{new Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(item.precovenda)}</TableCell>
                    </TableRow>))}
                  </TableBody>
                </Table> */}
        <div className="mt-1 flex gap-1 text-sm">
          <span className="mr-7 p-1 text-sm font-semibold text-muted-foreground">
            Total de Páginas {pages}
          </span>
          <Button
            className="text-sm"
            onClick={() => handlePrevPage()}
            disabled={page <= 1}
          >
            Anterior
          </Button>
          <Button
            className="text-sm"
            onClick={() => handleNextPage()}
            disabled={page >= pages}
          >
            Proximo
          </Button>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleCancel()}>
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
