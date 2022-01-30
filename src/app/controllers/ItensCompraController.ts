import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import ItensCompra from '../models/ItensCompra';

class ItensCompraController {
    async list(req: Request, res: Response){
        const repository = getRepository(ItensCompra);
        try {
            const lista = await repository.find({
                relations: ["compra", "artefato"],
            });
            const formatList = lista.map(({id, quantidade, valor, compra, artefato}) => ({
                id,
                quantidade,
                valor,
                compra: compra.id,
                artefato: artefato.id
            })
          );
          return res.status(200).json(formatList);
        } catch({message}){
            return res.status(400).send(message);
        }
    }

    async store(req: Request, res: Response){
        const repository = getRepository(ItensCompra);
        const j = repository.create(req.body); //cria a entidade Endereco
        await repository.save(j); //persiste a entidade na tabela.
        return res.json(j);
    }

    async delete(req: Request, res: Response) {
        try {
            const repository = getRepository(ItensCompra);
            const { id } = req.body;
            const end = await repository.findOne({ where: { "id": id } });
            //console.log(end)

            if (end) {
                await repository.remove(end);
                return res.sendStatus(200);
            } else {
                return res.sendStatus(404);
            }
        } catch (e: unknown) {
            console.log(e);
            return res.sendStatus(500);
        }
    }
}

export default new ItensCompraController();