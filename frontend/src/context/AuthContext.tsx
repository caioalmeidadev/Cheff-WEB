import { createContext, useContext, useEffect, useState } from 'react'
import api from '@/services/api.ts'

interface UserProps {
  codFuncionario: string
  nome: string
  senha: string
  dataRegistro: string
  isAuthenticated: boolean
}
interface AuthContextProps {
  user: UserProps
  login: (codigo: string, senha: string) => Promise<void>
  logout: () => void
  getHost: () => string
  setHost: (hostName: string) => void
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserProps>({
    codFuncionario: '',
    nome: '',
    senha: '',
    dataRegistro: '',
    isAuthenticated: false,
  })

  async function loadUser() {
    const userItem = localStorage.getItem('@AlphaSys:Comandas')

    if (userItem) {
      const localUser = JSON.parse(userItem)

      setUser(() => ({
        codFuncionario: localUser.codigo,
        nome: localUser.nome,
        senha: localUser.senha,
        dataRegistro: localUser.dataRegistro,
        isAuthenticated: true,
      }))
    }
  }

  async function login(codigo: string, senha: string) {
    try {
      const response = await api.post('/login', {
        usuario: codigo.padStart(6, '0'),
        senha,
      })
      console.log(response.data)
      if (response.data) {
        const registredUser = response.data.usuario
        localStorage.setItem(
          '@AlphaSys:Comandas',
          JSON.stringify(registredUser),
        )
        setUser(() => ({
          codFuncionario: registredUser.codigo,
          nome: registredUser.nome,
          senha: registredUser.senha,
          dataRegistro: new Date().toString(),
          isAuthenticated: true,
        }))

        api.interceptors.request.use(
          (config) => {
            if (user) {
              config.headers.Authorization = JSON.stringify({
                codigo: user.codFuncionario,
                senha: user.senha,
              })
            }

            return config
          },
          (err) => {
            return Promise.reject(err)
          },
        )
      }
    } catch (err) {
      console.error(err)
      throw new Error('Erro ao realizar login')
    }
  }
  async function logout() {
    localStorage.removeItem('@AlphaSys:Comandas')
    setUser({
      codFuncionario: '',
      nome: '',
      senha: '',
      dataRegistro: '',
      isAuthenticated: false,
    })
  }

  function getHost() {
    return localStorage.getItem('@AlphaSys:APIURL') || ''
  }

  function setHost(hostName: string) {
    localStorage.setItem('@AlphaSys:APIURL', hostName)
  }

  useEffect(() => {
    loadUser().then((data) => {
      console.warn(data)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, getHost, setHost }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
