const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

class ConnectionFactory{
    constructor(){
        ConnectionFactory._instance
    }

    static get instance(){
        if (!ConnectionFactory._instance){
            ConnectionFactory._instance = new ConnectionFactory()
        }

        return ConnectionFactory._instance
    }

    async getConnection(){
        try {
            const db = await sqlite.open({
                filename: './persistence/db.sqlite',
                driver: sqlite3.Database
            })

            return db

        } catch (error) {
            throw error
        }
    }

    async closeConnection(db){
        await db.close()
    }

    async createTable(){
        try {
            const db = await this.getConnection()

            const tableUrl = `CREATE TABLE IF NOT EXISTS link (
                url TEXT,
                virtualUrl TEXT,
                click INTEGER
            )`

            await db.exec(tableUrl)
            await this.closeConnection(db)
        } catch (error) {
            throw error
        }
    }
}

module.exports = ConnectionFactory