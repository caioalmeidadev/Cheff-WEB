import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('@AlphaSys:Comandas') as string
  if (user && user !== '') {
    config.headers.Authorization = user
  }
  return config
})
export default api
