import { useEffect } from 'react'
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
import { useAuth } from '@/context/AuthContext'

export default function ComandaProdutoEditar() {
  const { codMesa, codigo } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const form = useForm<pedidoFormDataType>({
    resolver: zodResolver(pedidoFormSchema),
    defaultValues: {
      qtde: 1,
      complemento: '',
    },
  })
  async function loadProduto(codigo: string, codMesa: string) {
    const response = await api.get(`/comandas/${codMesa}/editar/${codigo}`)

    if (response.data) {
      form.setValue('codigo', response.data.cod_produto)
      form.setValue('descricao', response.data.descricao)
      form.setValue(
        'complemento',
        response.data.complemento ? response.data.complemento : '',
      )
      form.setValue('qtde', response.data.qtde)
      form.setValue('val_total', response.data.total)
      form.setValue('val_unitario', response.data.unitario)
    }
  }

  useEffect(() => {
    if (codigo && codMesa) {
      loadProduto(codigo, codMesa!)
    }
  }, [codMesa, codigo])

  const handleFormSubmit = async (data: pedidoFormDataType) => {
    try {
      const updatedProd = {
        codigo,
        codProduto: data.codigo,
        qtde: data.qtde,
        complemento: data.complemento,
        valUnitario: data.val_unitario,
        valTotal: data.val_total,
      }
      console.log(updatedProd)
      await api.put(`/comanda/${codMesa}/editar/${codigo}`, updatedProd, {
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

  async function handleChangeQtd(tipo: 'somar' | 'subtrair') {
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
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="codigo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código</FormLabel>
                        <FormControl>
                          <div className="flex gap-2 items-center justify-center">
                            <Input
                              disabled
                              placeholder="Digite o código do produto"
                              type="number"
                              {...field}
                            />
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
                <div className="grid grid-cols-2 gap-1 ">
                  <FormField
                    control={form.control}
                    name="val_unitario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Unitário</FormLabel>
                        <FormControl>
                          <Input
                            className="w-24"
                            placeholder="0.00"
                            type="number"
                            {...field}
                          />
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
                          <div className="flex gap-1 items-center justify-center">
                            <Button
                              type="button"
                              onClick={() => handleChangeQtd('somar')}
                            >
                              +
                            </Button>
                            <Input
                              className="w-16"
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
