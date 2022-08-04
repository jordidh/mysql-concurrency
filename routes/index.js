var express = require('express');
var router = express.Router();
const logger = require('../api/logger');
const config = require('../config/config');
var mysql = require('mysql');

const semaphore = new Semaphore(1);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'mysql-concurrency' });
});

router.post('/scenario1', function(req, res, next) {
  // Procés 1
  let con = mysql.createConnection(config.db);
  
  con.connect(function(err) {
    if (err) throw err;

    logger.log("scenario1.A", "OK", "Connected!");

    con.query('select * from concurrency_1 where id = 1 and version = 0', function (error, results, fields) {
      if (error) throw error;
      // connected!

      logger.log("scenario1.A.connection.query", "OK", `Data read ${JSON.stringify(results)}`);

      con.query(`update concurrency_1 set value = 'taylor', version = 1 where id = 1 and version = 0`, function (error, results, fields) {
        if (error) throw error;

        if (results && results.affectedRows && results.affectedRows === 1) {
          logger.log("scenario1.A.connection.query", "OK", `Data updated ${JSON.stringify(results)}`);
        } else {
          logger.log("scenario1.A.connection.query", "ERR", `Data NOT updated ${JSON.stringify(results)}`);
        }

        con.end(function(err) {
          if (err) {
            logger.log("scenario1.A.connection.end", "ERR", err);
          } else {
            logger.log("scenario1.A", "OK", `End`);
          }
        });
      });
    });
  });

  let con2 = mysql.createConnection(config.db);
  con2.connect(function(err) {
    if (err) throw err;

    logger.log("scenario1.B", "OK", "Connected!");

    con2.query('select * from concurrency_1 where id = 1 and version = 0', function (error, results, fields) {
      if (error) throw error;
      // connected!

      logger.log("scenario1.B.connection.query", "OK", `Data read ${JSON.stringify(results)}`);

      con2.query(`update concurrency_1 set value = 'Sawyer', version = 1 where id = 1 and version = 0`, function (error, results, fields) {
        if (error) throw error;

        if (results && results.affectedRows && results.affectedRows === 1) {
          logger.log("scenario1.A.connection.query", "OK", `Data updated ${JSON.stringify(results)}`);
        } else {
          logger.log("scenario1.A.connection.query", "ERR", `Data NOT updated ${JSON.stringify(results)}`);
        }

        con2.end(function(err) {
          if (err) {
            logger.log("scenario1.B.connection.end", "ERR", err);
          } else {
            logger.log("scenario1.B", "OK", `End`);
          }
        });
      });
    });
  });
  
  // 1. Recuperem el registre de la BD

  // 2. Modifiquem el registre

  // 3. Verifiquem que realment s'ha modificat



  //1. Es llença una petició de modificar un registre de la BD
  //2. El procés recupera el registre i s'espera a que s'inicii una petició del mateix registre
  //3. Es llença una altra petició per modificar el mateix registre de la BD
  //4. El procés recupera el registre, desbloqueja lel primer procés i s'espera a que el primer procés acabi
  //5. El primer procés actualitza el registre, desbloqueja el segon procés i finalitza
  //6. El segon procés intenta actualitza i no pot ja que s'ha modificat per un altre procés i finalitza

  res.render('index', { title: 'mysql-concurrency' });
});


module.exports = router;
