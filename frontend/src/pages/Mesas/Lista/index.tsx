import { useCallback, useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'
import api from '../../../services/api.ts'

import { Utensils } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

interface MesaProps {
  codigo: number
  ocupada: boolean
}

export function MesasLista() {
  const [mesas, setMesas] = useState<MesaProps[]>([])
  const { data: mesaResult } = useQuery({
    queryKey: ['grid-mesas'],
    queryFn: async () => {
      const {
        data: { mesas },
      } = await api.get('/mesas')

      return mesas
    },
  })

  const loadMesas = useCallback(() => {
    const m: MesaProps[] = []
    for (let i = 1; i <= 25; i++) {
      m.push({ codigo: i, ocupada: false })
    }

    if (!mesaResult) return m

    const response = m.map((item) => {
      if (
        mesaResult.find((i: { codigo: number }) => i.codigo === item.codigo)
      ) {
        return { codigo: item.codigo, ocupada: true }
      }
      return item
    })
    return response
  }, [mesaResult])

  useEffect(() => {
    setMesas(() => loadMesas())
  }, [loadMesas])

  return (
    <div className="min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Listagem de Mesas</CardTitle>
        </CardHeader>
        <CardContent>
          {!mesas && <span>Não existe mesas</span>}
          <div className="grid grid-cols-2 gap-1 sm:grid-flow-row lg:grid-cols-10 md:grid-cols-8 h-screen">
            {mesas.map((m) => {
              return (
                <Link
                  key={m.codigo}
                  to={`/mesas/${m.codigo}`}
                  className={`flex items-center justify-center rounded-md text-primary-foreground md:text-5xl 
                    md:w-32 md:h-32 sm:text-xs sm:w-2 sm:h-2 ${m.ocupada ? 'bg-red-600' : 'bg-green-600'}`}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Utensils className="md:w-14 md:h-14 sm:w-10 sm:h-10" />
                    <span className="text-lg">{m.codigo}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </CardContent>
        <CardFooter>
          <span className="w-full text-sm font-bold text-center">
            AlphaSys Tecnologia
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
