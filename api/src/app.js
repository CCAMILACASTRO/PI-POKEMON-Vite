//importacion de modulos.
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express(); //instancia de express

server.name = 'API'; // nombre de la instancia API

//Middlewars:
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' })); //se utiliza para analizar las solicitudes con datos JSON y datos codificados en URL.
server.use(cookieParser()); //se utiliza para analizar las cookies de las solicitudes entrantes.
server.use(morgan('dev')); //se utiliza para registrar las solicitudes HTTP en la consola para fines de depuración.
server.use((req, res, next) => { // control de acceso CORS que permite que las solicitudes vengan desde http://localhost:5173 y define metodos HTTP permitidos.
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes); //para asociar las rutas definidas en el módulo ./routes/index.js con el servidor. 

// Error catching endware: Se define un middleware de manejo de errores que captura los errores en las solicitudes y responde con un código de estado y un mensaje de error apropiados.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
