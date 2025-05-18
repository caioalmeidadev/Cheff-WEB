import { Outlet, Link } from 'react-router-dom'
import { Home, LogOut } from 'lucide-react'
import { Button } from './components/ui/button'
import { Toaster } from './components/ui/toaster'
import { useAuth } from './context/AuthContext'

function App() {
  const { logout } = useAuth()
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between bg-zinc-100  w-full h-[60px] shadow-md">
        <img
          className="w-12 h-12 ml-4 shadow-xl rounded-md"
          src="/logo.png"
          alt="logo"
        />
        <nav className="flex gap-3 items-center justify-center py-2">
          <Button variant="link" asChild>
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Home className="w-6 h-6 mr-1" />
              Home
            </Link>
          </Button>
          <Button
            variant="link"
            asChild
            className="text-destructive text-sm font-bold"
          >
            <Link to="/" onClick={() => logout()} className="">
              <LogOut className="w-6 h-6 mr-1" />
              Sair
            </Link>
          </Button>
        </nav>
      </div>
      <div className="px-4 py-2 w-full">
        <Outlet />
      </div>
      <Toaster />
    </div>
  )
}

export default App
