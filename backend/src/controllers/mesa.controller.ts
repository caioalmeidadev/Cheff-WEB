import { Request, Response } from "express";
import { MesaRepository } from "../repositories/mesa.repository";

class MesasController {
    constructor(private _mesaRepository: MesaRepository) { }

    async getMesas(req: Request, res: Response) {
        try {
            const mesas = await this._mesaRepository.getAll();
            res.json(mesas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getMesa(req: Request, res: Response) {
        try {
            const mesa = await this._mesaRepository.findById(req.params.id);
            if (!mesa) return res.status(404).json({ message: 'Mesa not found' });
            res.json(mesa);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}


export default new MesasController(new MesaRepository());