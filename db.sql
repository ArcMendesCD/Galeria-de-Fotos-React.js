CREATE DATABASE galeria;

CREATE TABLE galeria.usuarios (
	id INT auto_increment PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pword VARCHAR(32)
);

CREATE TABLE galeria.usuarios (
	id INT auto_increment PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pword VARCHAR(32)
);

CREATE TABLE galeria.fotos (
	id INT auto_increment PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    data_upload VARCHAR(32) DEFAULT CURRENT_TIMESTAMP,
	cor_predominante VARCHAR(32) DEFAULT CURRENT_TIMESTAMP,
    foto_data BLOB
);

CREATE TABLE galeria.albums (
	id INT auto_increment PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    descricao VARCHAR(255) NOT NULL
);

	INSERT INTO galeria.albums (titulo, descricao) VALUES ('teste','testetetetetettetetetetetetetetetete');
    
CREATE TABLE galeria.album_fotos (
    album_id INT,
    foto_id INT,
    PRIMARY KEY (album_id, foto_id),
    FOREIGN KEY (album_id) REFERENCES galeria.albums(id) ON DELETE CASCADE,
    FOREIGN KEY (foto_id) REFERENCES galeria.fotos(id) ON DELETE CASCADE
);

-- Inserir dois novos álbuns
INSERT INTO galeria.albums (titulo, descricao) VALUES 
('Viagem para o Campo', 'Fotos de uma viagem inesquecível pelo interior'),
('Noite em São Paulo', 'Cenas urbanas capturadas durante a noite');

SET @album3_id = LAST_INSERT_ID(); 

INSERT INTO galeria.albums (titulo, descricao) VALUES 
('Arte e Cultura', 'Explorando o mundo da arte nas ruas');

SET @album4_id = LAST_INSERT_ID();

-- Inserir quatro novas fotos
INSERT INTO galeria.fotos (titulo, descricao, foto_data) VALUES 
('Paisagem Verde', 'Uma bela paisagem de montanhas e árvores', NULL);

SET @foto5_id = LAST_INSERT_ID();

INSERT INTO galeria.fotos (titulo, descricao, foto_data) VALUES 
('Rio Sereno', 'Um pequeno rio refletindo o céu azul', NULL);

SET @foto6_id = LAST_INSERT_ID();

INSERT INTO galeria.fotos (titulo, descricao, foto_data) VALUES 
('Arranha-céus Iluminados', 'Prédios altos com luzes vibrantes', NULL);

SET @foto7_id = LAST_INSERT_ID();

INSERT INTO galeria.fotos (titulo, descricao, foto_data) VALUES 
('Grafite Colorido', 'Arte de rua em uma parede de concreto', NULL);

SET @foto8_id = LAST_INSERT_ID();

-- Associar as fotos corretamente com os novos álbuns
INSERT INTO galeria.album_fotos (album_id, foto_id) VALUES 
(@album3_id, @foto5_id),
(@album3_id, @foto6_id),
(@album4_id, @foto7_id),
(@album4_id, @foto8_id);

SELECT f.id, f.titulo, f.descricao, f.data_upload, f.cor_predominante, f.foto_data
FROM galeria.fotos f
JOIN galeria.album_fotos af ON f.id = af.foto_id
WHERE af.album_id = 7;

select * from galeria.album_fotos;

select * from galeria.albums;

select * from galeria.fotos