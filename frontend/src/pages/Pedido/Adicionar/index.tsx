import { useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { pedidoFormDataType, pedidoFormSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '@/services/api.ts'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { Search } from '@/components/Search'
import { useAuth } from '@/context/AuthContext'

export default function ComandaProdutoAdicionar() {
  const { codMesa } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useForm<pedidoFormDataType>({
    resolver: zodResolver(pedidoFormSchema),
    defaultValues: {
      qtde: 1,
    },
  })

  async function SearchProduto() {
    if (Number(form.getValues('codigo')) > 0) {
      const np = form.getValues('codigo').padStart(6, '0')
      const result = await api.get(`/produtos/${np}`)

      const produto = result.data.produto[0]
      if (produto) {
        form.setValue('descricao', produto.produto)
        form.setValue('qtde', 1)
        form.setValue('val_unitario', produto.precovenda)
        form.setValue('val_total', produto.precovenda)
        form.setFocus('qtde')
      }
    }
  }

  const codProduto = form.watch('codigo')

  useEffect(() => {
    if (codProduto) {
      ;(async () => await SearchProduto())()
    }
  }, [codProduto])

  const handleFormSubmit = async (data: pedidoFormDataType) => {
    try {
      const newProduto = {
        codProduto: data.codigo,
        complemento: data.complemento,
        qtde: data.qtde,
        valUnitario: data.val_unitario,
        valTotal: data.val_total,
      }
      await api.post(`/comandas/${codMesa}`, newProduto, {
        auth: { username: user.codFuncionario, password: user.senha },
      })
      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Produto lançado com sucesso',
      })
      navigate(`/mesas/${codMesa}`)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o produto',
      })
    }
  }

  const handleChangeQtd = useCallback((tipo: 'somar' | 'subtrair') => {
    if (tipo === 'somar') {
      form.setValue('qtde', form.getValues('qtde') + 1)
      const total = form.getValues('qtde') * form.getValues('val_unitario')
      form.setValue('val_total', total)
    }
    if (tipo === 'subtrair') {
      form.setValue('qtde', form.getValues('qtde') - 1)
      if (form.getValues().qtde <= 0) form.setValue('qtde', 1)
      const total = form.getValues('qtde') * form.getValues('val_unitario')
      form.setValue('val_total', total)
    }
  }, [])
  function handeSelectedValue(codItem: string) {
    form.setValue('codigo', codItem)
  }

  return (
    <div className="min-h-screen my-4 mx-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Adicionar produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="codigo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código</FormLabel>
                        <FormControl>
                          <div className="flex gap-2 items-center justify-center">
                            <Input
                              placeholder="Digite o código do produto"
                              type="number"
                              {...field}
                            />
                            <Search onSelectedValue={handeSelectedValue} />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Aqui é o nome do produto"
                            disabled
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="complemento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input placeholder="Complemento" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 ">
                  <FormField
                    control={form.control}
                    name="val_unitario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Unitário</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" type="number" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="qtde"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <div className="flex gap-4 items-center justify-start">
                            <Button
                              type="button"
                              onClick={() => handleChangeQtd('somar')}
                            >
                              +
                            </Button>
                            <Input
                              className="md:w-24 sm:w-14"
                              placeholder="1"
                              type="number"
                              disabled
                              {...field}
                            />
                            <Button
                              type="button"
                              onClick={() => handleChangeQtd('subtrair')}
                            >
                              -
                            </Button>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="val_total"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" disabled {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter className="flex items-end justify-end gap-2">
          <Button size="lg" onClick={form.handleSubmit(handleFormSubmit)}>
            Salvar
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={() => navigate(`/mesas/${codMesa}`)}
          >
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
