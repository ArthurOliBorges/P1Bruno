import CarroDB from "../asyconexao.js";

async function testeDatabase() {
    try {
        // 1. Listar todos os carros
        console.log("--- Listando Carros ---");
        const carros = await CarroDB.getCarros();
        carros.forEach(c => console.log(`${c.id}: ${c.nome} (${c.tipo})`));

        // 2. Inserir um novo carro
        console.log("\n--- Inserindo Carro ---");
        let novoCarro = { nome: "Jeep", tipo: "quase-offroad" };
        const carroSalvo = await CarroDB.save(novoCarro);
        console.log(`Carro salvo com ID: ${carroSalvo.id}`);

        // 3. Atualizar um carro existente (exemplo com ID 4)
        console.log("\n--- Atualizando Carro ---");
        let carroParaAtualizar = { id: 4, nome: "Ford-GT", tipo: "esporte" };
        const carroAtualizado = await CarroDB.update(carroParaAtualizar);
        console.log(`Carro ${carroAtualizado.id} atualizado para ${carroAtualizado.nome}`);

        // 4. Consultar por ID
        console.log("\n--- Consultando ID 2 ---");
        const carroId2 = await CarroDB.getCarrosById(2);
        if (carroId2) {
            console.log(`Localizado: ${carroId2.nome}`);
        } else {
            console.log("Carro não encontrado.");
        }

        // 5. Deletar um carro (Exemplo deletando o que acabamos de criar)
        console.log("\n--- Deletando Carro ---");
        const rowsAffected = await CarroDB.deleteById(carroSalvo.id);
        console.log(`Registros deletados: ${rowsAffected}`);

    } catch (error) {
        console.error("Erro na operação:", error.message);
    }
}

// Executa a função de teste
testeDatabase();