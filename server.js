const express = require("express");

const projectRouter = require('./data/helpers/project-router.js')
const actionRouter = require('./data/helpers/action-router.js')

const server = express();

server.use(express.json());

server.use('/api/project', projectRouter);

server.use('/api/action', actionRouter);
 
module.exports = server;