const express = require('express')
const http = require('http')
const app = require('./app.js')

const port = 3000
const server = http.createServer(app)

server.listen(port, console.log(`Servidor rodando na porta ${port}`))

