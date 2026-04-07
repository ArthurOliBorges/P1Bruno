import mysql from 'mysql2'

export default class CarroDB {

   static connect() {
    //Criar a conexão com mysql
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'livro'
    })
    //Conecta ao banco
    connection.connect()
    return connection
   }

   //Retornar lista - Padrão Singleton
   static getCarros(callback) {
    var connection = CarroDB.connect()
    //Criar consulta
    let sql = "select * from carro"
    let query = connection.query(sql, function (error, results, fields){
        if(error) throw error
        //retorn os dados pelo callback
        callback(results)
        connection.end()
    })
        console.log(query.sql)
        
   }

   //Listar por tipo
   static getCarrosByTipo(tipo, callback) {
   let connection = CarroDB.connect()
   //Criar consulta com parametro
   let sql = "select id, nome, tipo from carro where tipo = '" + tipo + "'"
   let query = connection.query(sql, function (error, results, fileds){
    if(error) throw error
    //Retorna
    callback(results)
   })
   console.log(query.sql)
   connection.end()
   }

   //Listar por id
   static getCarrosById(id, callback) {
    let connection = CarroDB.connect()
    let sql = "select * from carro where id = '" + id + "'"
    let query = connection.query(sql, id, function(error, results, fields){
    if(error) throw error
    callback(results)
    })
    console.log(query.sql)
    connection.end()
   }

      //Listar por id2
   static getCarrosById(id, callback) {
    let connection = CarroDB.connect()
    let sql = "select * from carro where id = ?"
    let query = connection.query(sql, id, function(error, results, fields){
    if(error) throw error
    let carro = results[0]
    callback(carro)
    })
    console.log(query.sql)
    connection.end()
   }

   //Salvar no banco de dados
   static save(carro, callback) {
    let connection = CarroDB.connect()
    //Insere no banco
    let sql = "insert into carro set ?"
    let query = connection.query(sql, carro, function (error, results, fileds) {
        if(error) throw error
        //Atualiza o objeto carro do parâmetro com "id" inserido
        carro.id = results.insertId
        callback(carro)
    })
    console.log(query.sql)
    connection.end()
   }

   //Atualizar banco de dados
   static update(carro, callback) {
    let connection = CarroDB.connect()
    let sql = "update carro set ? where id = ?"
    //Id do carro para atualizar
    let id = carro.id 
    let query = connection.query(sql, [carro,id], function(error, results, fields){
        if(error) throw error 
        callback(carro)
    })
       console.log(query.sql)
       connection.end()
   }

   //Deletar um carro no BD
   static delete(carro, callback){
    let connection = CarroDB.connect()
    let sql = "delete from carro where id = ?"
    let id = carro.id
    let query = connection.query(sql, id, function (error, results, fields){
        if(error) throw error
        callback(carro)
    })
    console.log(query.sql)
    connection.end()
   }

      //Deletar um carro no BD by ID direto
   static deletebyId(id, callback){
    let connection = CarroDB.connect()
    let sql = "delete from carro where id = ?"
    
    let query = connection.query(sql, id, function (error, results, fields){
        if(error) throw error
        callback(results.affectedRows)
    })
    console.log(query.sql)
    connection.end()
   }

 





}