import { executeQuery } from "../../config/database.js";

class Mesa {
    
    async listar() {
        
        return await executeQuery('select codigo from R000001 order by codigo',[])
        
    }
}

export default new Mesa()