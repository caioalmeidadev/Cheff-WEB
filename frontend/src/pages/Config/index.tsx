import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Config() {
    const [url,setUrl] = useState('')
    const navigate = useNavigate()
    const {setHost} = useAuth()
    
    function handleConfig(){
            if(url !== ''){
                setHost(url)
                navigate('/login')
            }
    }
    return <div className="flex items-center justify-center min-h-screen w-full">
        <div className="bg-gray-400 p-4 rounded flex flex-col items-center justify-center gap-2">
            <Label htmlFor="url">Insira o caminho do servidor</Label>
                <Input value={url} onChange={e => setUrl(e.target.value)} name="url"/>
            <Button  onClick={handleConfig}>Salvar</Button>
        </div>
    </div>
}