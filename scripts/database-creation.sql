CREATE DATABASE IF NOT EXISTS ctest;

use `ctest`;

CREATE TABLE IF NOT EXISTS `concurrency_1` (
    id INT NOT NULL AUTO_INCREMENT,
    `version` INT NOT NULL DEFAULT 0,
    `value` VARCHAR(50),
PRIMARY KEY (id));

INSERT INTO `concurrency_1`
  (id, `version`, `value`) 
VALUES 
  (1, 0, "Smith")
ON DUPLICATE KEY UPDATE
  `version` = 0,
  `value` = "Smith";