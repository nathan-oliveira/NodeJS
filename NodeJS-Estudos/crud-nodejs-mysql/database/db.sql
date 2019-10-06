-- criando database
CREATE DATABASE crudnodejsmysql;

-- usando database
use crudnodejsmysql;

-- criando tabela
CREATE TABLE customer(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL
);

-- mostrar todas tabelas
SHOW TABLES;

-- mostrar describe tabelas
DESCRIBE customer;