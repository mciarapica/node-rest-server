const Server = require('./models/server.js');
require('dotenv').config();

//Instancio el server
const server = new Server();
server.listen();