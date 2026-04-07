import mysql from 'mysql2/promise'

export default class CarroDB {

    static async connect() {
        return await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'livro'
        })
    }

    static async getCarros() {
        const connection = await CarroDB.connect()
        const [results] = await connection.query("select * from carro")
        await connection.end()
        return results
    }

    static async getCarrosById(id) {
        const connection = await CarroDB.connect()
        const [results] = await connection.query(
            "select * from carro where id = ?",
            [id]
        )
        await connection.end()
        return results[0]
    }

    static async getCarrosByTipo(tipo) {
        const connection = await CarroDB.connect()
        const [results] = await connection.query(
            "select id, nome, tipo from carro where tipo = ?",
            [tipo]
        )
        await connection.end()
        return results
    }

    static async save(carro) {
        const connection = await CarroDB.connect()
        const [results] = await connection.query(
            "insert into carro (nome, tipo) values (?, ?)",
            [carro.nome, carro.tipo]
        )
        carro.id = results.insertId
        await connection.end()
        return carro
    }

    static async update(carro) {
        const connection = await CarroDB.connect()
        await connection.query(
            "update carro set nome = ?, tipo = ? where id = ?",
            [carro.nome, carro.tipo, carro.id]
        )
        await connection.end()
        return carro
    }

    static async delete(carro) {
        const connection = await CarroDB.connect()
        const [results] = await connection.query(
            "delete from carro where id = ?",
            [carro.id]
        )
        await connection.end()
        return results.affectedRows
    }

    static async deleteById(id) {
        const connection = await CarroDB.connect()
        const [results] = await connection.query(
            "delete from carro where id = ?",
            [id]
        )
        await connection.end()
        return results.affectedRows
    }
}

