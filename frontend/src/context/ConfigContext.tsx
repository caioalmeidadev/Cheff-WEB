import { createContext, useContext, useEffect, useState } from 'react'

interface ConfigContextProps {
  connectionString: string
  saveConnectionString: (url: string) => void
  logoUrl: string
}

export const ConfigContext = createContext({} as ConfigContextProps)

export function ConfigContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [connection, setConnection] = useState<string>('')
  const [logoUrl, setLogoUrl] = useState<string>('/logo.png')

  function getConnectionString() {
    setConnection(localStorage.getItem('@AlphaSys:APIURL') as string)
  }

  function saveConnectionString(url: string) {
    localStorage.setItem('@AlphaSys:APIURL', url)
    setConnection(url)
  }

  function getLogoUrl() {
    const path = localStorage.getItem('@AlphaSys:LogoURL')
    if (path) {
      setLogoUrl(path)
    }
  }

  useEffect(() => {
    getConnectionString()
    getLogoUrl()
  }, [])

  return (
    <ConfigContext.Provider
      value={{ connectionString: connection, saveConnectionString, logoUrl }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  return useContext(ConfigContext)
}
