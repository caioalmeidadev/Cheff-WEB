import { Request, Response } from "express";
import { ComandaRepository } from "../repositories/comanda.repository";

class ComandasController {
    constructor(private comandaRepository: ComandaRepository) { }

    listar = async (request: Request, response: Response) => {
        const { codMesa } = request.params;
        try {
            const comanda = await this.comandaRepository.listar(codMesa);
            return response.status(200).send({ comanda });
        } catch (error) {
            return response.status(500).send({ error: "Erro ao listar comanda" });
        }
    }

    lancarProduto = async (request: Request, response: Response) => {
        const { codMesa } = request.params;
        const { cod_produto, qtde, valUnitario, valTotal, complemento } = request.body;

        try {
            await this.comandaRepository.lancarProduto({ codMesa: Number(codMesa), codigo: cod_produto, qtde, valUnitario, valTotal, complemento });
            return response.status(201).send();
        } catch (error) {
            console.log(error);
            return response.status(500).send({ error: "Ocorreu um erro ao gravar o lancamento" });
        }
    }
    cancelarProduto = async (request: Request, response: Response) => {
        const { codigo, codMesa } = request.params;
        try {
            await this.comandaRepository.cancelarProduto(codigo);
            await this.comandaRepository.cancelarMesa(codMesa);
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send({ error: "Ocorreu um erro ao cancelar o produto" });
        }
    }
    editarProduto = async (request: Request, response: Response) => {
        const { codMesa, codigo } = request.params;
        const { complemento, qtde, valUnitario, valTotal } = request.body;

        try {
            await this.comandaRepository.editarProduto({ codigo, qtde, valUnitario, valTotal, complemento });
            return response.status(200).send();
        } catch (error) {
            return response.status(500).send({ error: "Erro ao editar produto" });
        }
    }
    listarEditar = async (request: Request, response: Response) => {
        const { codMesa, codigo } = request.params;
        try {
            const produto = await this.comandaRepository.listarEdicao({ codMesa, codigo });
            return response.status(200).send({ produto });
        } catch (error) {
            return response.status(500).send({ error: "Erro ao listar produto" });
        }
    }
    extratoComanda = async (request: Request, response: Response) => {
        const { codMesa } = request.params;
        try {
            const extrato = await this.comandaRepository.extrato(codMesa);
            return response.status(200).send({ extrato });
        } catch (error) {
            return response.status(500).send({ error: "Erro ao listar extrato" });
        }
    }
}

export default new ComandasController(new ComandaRepository());