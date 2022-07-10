
const Link = require('../model/link')
const DAO = require('../persistence/DAO')
const db = new DAO()

async function initdb() {
    await db.init()
}
initdb()

module.exports = {
    async index(req, res){
        try {
            const result = await db.getAll()
            res.render('index', { result })
        } catch (error) {
            res.status(500).render('index',  { result })
        }
    },
    async idLink(req, res){
        try {
            const { id } = req.params
            const result = await db.get(id)
            result.click++
            await db.update(result)

            res.redirect(result.url)
        } catch (error) {
            res.status(500).redirect('/')
        }
    },
    async newLink(req, res){
        try {
            const { url } = req.body
            const obj = new Link(url)
            await db.insert(obj)
            res.redirect('/')

        } catch (error) {
            res.status(500).redirect('/')
        }
    }
}