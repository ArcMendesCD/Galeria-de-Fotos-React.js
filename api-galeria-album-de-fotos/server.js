const express = require('express');
const mysql = require('mysql2');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'galeria'
});

db.connect((err) => {
    console.log('backend conectado no banco com sucesso');
});

function hashzarSenha(senha) {
    return crypto.createHash('md5').update(senha).digest('hex');
  }

//Registro :)
app.post('/api/usuarios/register', (req, res) => {
    const { nome, email, senha } = req.body;
  
    const senhaHash = hashzarSenha(senha);
  
    const query = 'INSERT INTO usuarios (nome, email, pword) VALUES (?, ?, ?)';
    db.query(query, [nome, email, senhaHash], (err, result) => {
      if (err) {
        console.error('Erro na execução da query', err);
        return res.status(500).json({ message: 'erro interno' });
      }
      res.status(201).json({ message: 'Usuario registrado com sucesso' });
    });
  });

// selecionar dados

app.get('/api/usuarios/select', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Erro buscando dados no DB', err);
            return res.status(500).json({ message: 'Erro interno' });
        }
        res.status(200).json(results);
    });
});

// Login :/
app.post('/api/usuarios/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "Dados faltando ambos os campos devem estar preenchidos" });
    }

    const senhaHash = hashzarSenha(senha);

    const query = 'SELECT * FROM usuarios WHERE email = ? AND pword = ?';

    db.query(query, [email, senhaHash], (err, results) => {
        if (err) {
            console.error('Erro na execução da query', err);
            return res.status(500).json({ message: 'erro interno' });
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Sucesso no Login', user: results[0] });
        } else {
            res.status(401).json({ message: 'Usúario ou senha incorretos' });
        }
    });
});

// Albums :/
app.get('/api/albums/select', (req, res) => {
    db.query('SELECT * FROM albums', (err, results) => {
        if (err) {
            console.error('Erro buscando dados no DB', err);
            return res.status(500).json({ message: 'Erro interno' });
        }
        res.status(200).json(results);
    });
});

// Album photos :/
app.get('/api/albums/select_fotos/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'ID do álbum é obrigatório' });
    }
    db.query('SELECT f.id, f.titulo, f.descricao, f.data_upload, f.cor_predominante, f.foto_data FROM galeria.fotos f JOIN galeria.album_fotos af ON f.id = af.foto_id WHERE af.album_id = ?;',
         [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar fotos:', err);
            return res.status(500).json({ message: 'Erro interno' });
        }
        res.status(200).json(results);
    });
});

//Criar Album :)
app.post('/api/albums/create', (req, res) => {
    const { titulo, descricao } = req.body;
  
    const query = 'INSERT INTO albums (titulo, descricao) VALUES (?, ?)';
    db.query(query, [titulo, descricao], (err, result) => {
      if (err) {
        console.error('Erro na execução da query', err);
        return res.status(500).json({ message: 'erro interno' });
      }
      res.status(201).json({ message: 'Album registrado com sucesso' });
    });
  });

  //Criar Album :)
app.post('/api/fotos/create', (req, res) => {
    const { titulo, descricao, data_upload, cor_predominante, foto_data } = req.body;
  
    const query1 = 'INSERT INTO fotos (titulo, descricao, data_upload, cor_predominante, foto_data) VALUES (?, ?, ?, ?, ?)';
    const query2 = 'INSERT INTO album_fotos (album_id, foto_id) VALUES (?, ?)';
    db.query1(query1, [titulo, descricao, data_upload, cor_predominante, foto_data], (err1, result) => {
      if (err1) {
        console.error('Erro na execução da query da tabela de fotos', err1);
        return res.status(500).json({ message: 'erro interno' });
      }
      res.status(201).json({ message: 'Album registrado com sucesso' });
    });

    db.query2(query2, [album_id, foto_id], (err2, result) => {
        if (err2) {
          console.error('Erro na execução da query da tabela de fotos', err2);
          return res.status(500).json({ message: 'erro interno' });
        }
        res.status(201).json({ message: 'Album registrado com sucesso' });
      });
  });



app.listen(port, () => {
    console.log(`Servidor rodando no endereço http://localhost:${port}`);
});