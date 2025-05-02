import { Router } from "express";
import ClienteModel from '../model/Cliente/Model.js';

const clientesRouter = Router();

clientesRouter.get('/',async (request,response) =>{
  const clientes = await ClienteModel.listar();
  
  if(!clientes){
    return response.status(400).send({error: 'Não há clientes cadastrados'})
  }

  return response.status(200).send({clientes});
})

clientesRouter.get('/:id',async (request,response) =>{
  const {id} = request.params
  
  const cliente = await ClienteModel.mostrar(id);
  
  if(!cliente){
    return response.status(400).send({error: 'Cliente não encontrado'})
  }
  return response.status(200).send({cliente});
})

export default clientesRouter;