import { getConnection } from "typeorm";
import { afterAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import { app, setup } from "../../index";


describe("Testes do trabalho CS", () => {
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    const connection = await getConnection();
    connection.close();
  });

    it("teste /compra/list , /compra/store e /compra/delete", async () => {
        const agent = supertest(app);

        // Passo 1:
        // selecionar todos os registros da tabela, bem como,
        // as respectivas os dados da segunda tabela e demais tabelas.

        // Compras
        const listaCompras = await agent.post("/compra/list"); //Estará fazendo o READ

        console.log(`Total de registros em tb_compra: ${listaCompras.body.length}`)
        expect(listaCompras.statusCode).toEqual(200)

        // Itens Compra
        const listaItensCompras = await agent.post("/itens/list"); //Estará fazendo o READ

        console.log(`Total de registros em tb_itens_compra: ${listaItensCompras.body.length}`)
        expect(listaItensCompras.statusCode).toEqual(200)

        // Passo 2:
        //  caso encontre, imprimir na tela todas as 
        // informações de todas as tabelas;

        if(listaCompras.body.length > 0 && listaItensCompras.body.length > 0){
          // Ou seja, se tiver alguma compra ou algum item compra

          for(const [index, itens] of listaItensCompras.body.entries()){
          // Vai listar todos os dados
            console.log(itens)
            const data = {id: itens.id}

          // Passo 3:
          //  após a impressão remover os dados das tabelas;

            const postDeleteItensCompra = await agent.post("/itens/delete").send(data)
            expect(postDeleteItensCompra.statusCode).toEqual(200)
            console.log(`Item ID:${data.id} foi EXCLUÍDA`)
           
          }

          for(const [index, compra] of listaCompras.body.entries()){
            // Vai listar todos os dados
            console.log(compra)
            const data = {id: compra.id}

          // Passo 3:
          //  após a impressão remover os dados das tabelas;

            const postDeleteCompra = await agent.post("/compra/delete").send(data)
            expect(postDeleteCompra.statusCode).toEqual(200)
            console.log(`Compra ID:${data.id} foi EXCLUÍDA`)
          }

        } else {
          //Passo 4:
          // caso não encontre no passo 2,
          // inserir novos registros nas duas tabelas.

          // Inserir em Compra
          if(!listaCompras.body.length > 0){
            const data = {
              "data": new Date(),
              "total": Math.floor(Math.random() * 65536),
              "jogador": "player1"
            }
            const postCreateCompra = await agent.post("/compra/store").send(data);
            expect(postCreateCompra.statusCode).toEqual(200)
            console.log("Novo compra foi inserido.")
          }
          
           // Inserir em Itens Compra
          if(!listaItensCompras.body.length > 0){
            const listaComprasCopia = await agent.post("/compra/list");
            console.log(listaComprasCopia.body[0].id)
            const data = {
              "quantidade": "2",
              "valor": 50,
              "compra": listaComprasCopia.body[0].id,
              "artefato": 1
            }
            const postCreateItens = await agent.post("/itens/store").send(data);
            expect(postCreateItens.statusCode).toEqual(200)
            console.log("Novo item foi inserido.")
          }
          
          
        }

      });

})