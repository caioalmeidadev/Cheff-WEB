import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { MesasLista } from '../Mesas/Lista'
import { MesaDetalhes } from '../Mesas/Detalhes'
import App from '../../App'
import ComandaProdutoAdicionar from '../Pedido/Adicionar'
import ComandaProdutoEditar from '../Pedido/Editar'
import Login from '../Login'
import { useAuth } from '@/context/AuthContext'

function Router() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        
        {user.isAuthenticated  ? (
          <Route path="/" element={<App />}>
            <Route path="/" element={<MesasLista />} />
            <Route path="/mesas/:codMesa" element={<MesaDetalhes />} />
            <Route
              path="/mesas/:codMesa/pedido/adicionar"
              element={<ComandaProdutoAdicionar />}
            />
            <Route path='/mesas/:codMesa/pedido/editar/:codigo' element={<ComandaProdutoEditar/>}/>
          </Route>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
