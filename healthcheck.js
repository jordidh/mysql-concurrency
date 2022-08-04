// Aplicació que fa una crida al servidor i retorna OK o ERROR perquè Docker 
// pugui saber si l¡'aplicació funciona o no.
// 
// El servidor que es testeja ha de implementar una API [GET] /api/health que
// retorni un 200.
const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  timeout: 2000,
  method: 'GET',
  path: '/api/health/',
};

const request = http.request(options, (result) => {
  console.log(`Performed health check, result ${result.statusCode}`);
  if (result.statusCode === constants.HTTP_STATUS_OK) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', (err) => {
  console.error(`An error occurred while performing health check, error: ${err}`);
  process.exit(1);
});

request.end();