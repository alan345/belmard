#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../server/app')
var debug = require('debug')('petlocator_ng2:server')
var http = require('http')
var https = require('https');
var fs = require('fs');



// set port 80 to redirect to https
var express = require('express');
var app2 = express();
app2.get('*',function (req, res) {
    res.redirect('https://' + req.headers.host + req.url);
});
app2.listen(80,  function () {
   console.log('Started port: 80');
});




var sslOptions = {
  key: fs.readFileSync(__dirname + '/certs/app.mirabelle.io_private_key.key', 'utf8'),
  cert: fs.readFileSync(__dirname + '/certs/app.mirabelle.io_ssl_certificate.cer', 'utf8'),
  ca: fs.readFileSync(__dirname + '/certs/app.mirabelle.io_ssl_certificate_INTERMEDIATE.cer', 'utf8'),
  requestCert: false,
  rejectUnauthorized: false
};
// console.log(sslOptions)
//https://www.1and1.com/cloud-community/learn/networking/ssl-certificates/set-up-a-11-ssl-certificate/

/**
 * Get port from environment and store in Express.
 */

//console.log(app.get('env'))


var port = normalizePort(process.env.PORT || '443')
//var port = normalizePort(process.env.PORT || '3000')


app.set('port', port)

/**
 * Create HTTP server.
 */

var server = https.createServer(sslOptions, app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,  function () {
   console.log('Started port: ' + port);
})
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
 /// debug('Listening on ' + bind)
}
