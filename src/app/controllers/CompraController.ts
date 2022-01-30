import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Compra from '../models/Compra';

class CompraController {
    async list(req: Request, res: Response){
        const repository = getRepository(Compra);
        try {
            const lista = await repository.find({
                relations: ["jogador"],
            });
            const formatList = lista.map(({data, id, jogador: {nickname}, total}) => ({
                data,
                id,
                total,
                jogador: nickname,
            })
          );
          return res.status(200).json(formatList);
        } catch({message}){
            return res.status(400).send(message);
        }
    }

    async store(req: Request, res: Response){
        const repository = getRepository(Compra);
        console.log(req.body)
        const j = repository.create(req.body); //cria a entidade Endereco
        await repository.save(j); //persiste a entidade na tabela.
        return res.json(j);
    }

    async delete(req: Request, res: Response) {
        try {
            const repository = getRepository(Compra);
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

    async update(req: Request, res: Response) {
        const { id, type } = req.body;
        if (id) {
            if (type == "Compra") {
                const repository = getRepository(Compra);
                const j = repository.create(req.body);
                await repository.save(j); //persiste a entidade na tabela.
                return res.json(j);

            } else {
                return res.sendStatus(404);//registrou ou recurso nao encontrado.
            }
        } else {
            return res.sendStatus(404);//registrou ou recurso nao encontrado.
        }
    }
}

export default new CompraController();