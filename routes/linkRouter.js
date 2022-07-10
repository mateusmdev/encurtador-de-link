const express = require('express')
const router = express.Router()
const linkController = require('../controller/linkController.js')

router.get('/', linkController.index)

router.get('/:id', linkController.idLink)

router.post('/new-link', linkController.newLink)


module.exports = router