import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './pages/routes/index.tsx'
import './global.css'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ConfigContextProvider } from '@/context/ConfigContext.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigContextProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </AuthContextProvider>
    </ConfigContextProvider>
  </React.StrictMode>,
)
