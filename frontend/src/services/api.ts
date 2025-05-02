import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('@AlphaSys:Comandas') as string)
  if (user || user !== '') {
    config.headers = { username: user.codigo, password: user.senha }
  }
  return config
})
export default api
