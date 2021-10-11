const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')

server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

module.exports = server;
