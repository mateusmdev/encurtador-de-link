const ConnectionFactory = require("./connectionFactory");

class DAO{
    constructor(){
        this._factory = ConnectionFactory.instance
    }

    async insert(obj){
        const SQL = `INSERT INTO link (url, virtualUrl, click) VALUES (?, ?, ?)`
        try{
            const conn = await this._factory.getConnection()
            await conn.run(SQL, [obj._url, obj._virtualUrl, obj._click])
            await this._factory.closeConnection(conn)
        }catch(error){
            throw error
        }
    }

    async update(obj){
        const SQL = 'UPDATE link SET click = ? WHERE virtualUrl = ?'
        try{
            const conn = await this._factory.getConnection()
            await conn.run(SQL, [obj.click, obj.virtualUrl])
            await this._factory.closeConnection(conn)
        }catch(error){
            throw error
        }
    }

    async get(id){
        const SQL = `SELECT * FROM link WHERE virtualUrl = ?`
        try {
            const conn = await this._factory.getConnection()
            const result = await conn.all(SQL, [id])
            await this._factory.closeConnection(conn)

            return result[0]

        } catch (error) {
            throw error
        }
    }

    async getAll(){
        const SQL = `SELECT * FROM link`
        try {
            const conn = await this._factory.getConnection()
            const result = await conn.all(SQL)
            await this._factory.closeConnection(conn)

            return result

        } catch (error) {
            throw error
        }
    }

    async init(){
        await this._factory.createTable()
    }
}

module.exports = DAO