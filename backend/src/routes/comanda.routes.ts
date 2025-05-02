import { Router } from "express";
import comandaModel from "../model/Comanda/Model.js";

const comandaRouter = Router();

comandaRouter.get("/:codMesa", async (request, response) => {
  const {codMesa} = request.params

  try {
    const comanda = await comandaModel.listar(codMesa);
    if(!comanda){
      response.status(400).send({error: 'Comanda sem produtos lancados'});
    }
    response.status(200).send({comanda});
  } catch (error) {
    response.status(500).json({error})
  }
});

comandaRouter.post('/:codMesa', async (request,response) => {
  try {
    const {codMesa} = request.params
    const {codigo,qtde,valUnitario,valTotal,complemento} = request.body
    console.log(request.body)
    await comandaModel.lancarProduto({codMesa: Number(codMesa) , codigo, qtde, valUnitario, valTotal,complemento})
    return response.status(201).send()
  } catch (error) {
    console.log(error)
    return response.status(500).send({error: 'Ocorreu um erro ao gravar o lancamento'})
  }
})

comandaRouter.put('/cancelar/:codMesa/:codigo', async (request,response) => {
  try {
    const {codigo,codMesa} = request.params
    await comandaModel.cancelarProduto(codigo)
    await comandaModel.cancelarMesa(codMesa)
    return response.status(201).send()
  } catch (error) {
    return response.status(500).send({error: 'Ocorreu um erro ao cancelar o produto'})
  }
})

comandaRouter.put('/:codMesa/editar/:codigo', async (request,response) => {
  try{
    const {codMesa,codigo} = request.params

    const {complemento,qtde,valUnitario,valTotal} = request.body

    await comandaModel.editarProduto({codigo,qtde,valUnitario,valTotal,complemento})

    return response.status(200).send()

  }catch(error){
    return  response.status(500).send({error: 'Erro ao editar produto'})
  }
})

comandaRouter.get('/:codMesa/editar/:codigo', async (request,response) => {
  try{
    const {codMesa,codigo} = request.params
    const item = await comandaModel.listarEdicao({codMesa,codigo})
    return response.status(200).send(item)
  }catch(error){
    return response.status(500).send({error: 'Ocorreu um erro ao listar o produto'})
  }
})

comandaRouter.post('/extrato/:codMesa', async (request,response) => {
  try{
    const {codMesa} = request.params
    await comandaModel.extrato(codMesa)
    return response.status(200).send()
  }catch(error){
    console.log(error)
    return response.status(500).send({error: 'Ocorreu um erro solicitar extrato'})
  }
})


export default comandaRouter
