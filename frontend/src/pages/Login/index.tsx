'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { LoginFormDataProps, loginFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/context/AuthContext'
import { useConfig } from '@/context/ConfigContext.tsx'
import { useState } from 'react'

export default function Login() {
  const { login } = useAuth()
  const { connectionString, saveConnectionString, logoUrl } = useConfig()
  const [validConnection, setValidConnection] = useState(false)
  const form = useForm<LoginFormDataProps>({
    resolver: zodResolver(loginFormSchema),
  })
  async function handleFormSubmit(data: LoginFormDataProps) {
    if (validConnection) {
      await login(data.usuario, data.senha)
    }
  }

  function handleValidConnection() {
    if (connectionString) {
      setValidConnection(true)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col items-center justify-center w-[620px] rounded-md">
        <img
          className="w-[260px] h-[260px] rounded-2xl my-4"
          src={logoUrl}
          alt="logo"
        />

        <div className="w-full flex flex-col gap-4 px-12">
          <label htmlFor="connectionString">Servidor</label>
          <Input
            id="connectionString"
            value={connectionString}
            onChange={(e) => saveConnectionString(e.target.value)}
          />
          <Button onClick={() => handleValidConnection()}>
            Validar Conexão
          </Button>
        </div>

        <Form {...form}>
          <form className="space-y-8 w-full px-12 mb-4">
            <FormField
              control={form.control}
              name="usuario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o codigo de funcionario"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o codigo de funcionario"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="w-full text-lg"
              size="lg"
              onClick={form.handleSubmit(handleFormSubmit)}
              disabled={!validConnection}
            >
              <LogIn className="w-6 h-6 mr-4" />
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
