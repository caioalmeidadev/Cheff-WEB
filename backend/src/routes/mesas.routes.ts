import { Router } from "express";
import MesaModel from '../model/Mesa/Model.js';

const mesasRouter = Router();

mesasRouter.get('/',async (request,response) =>{
  const mesas = await MesaModel.listar()
  
  if(!mesas){
    return response.status(400).send({error: 'Não há clientes cadastrados'})
  }

  return response.status(200).send({mesas});
})

export default mesasRouter;