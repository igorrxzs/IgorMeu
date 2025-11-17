import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import pkg from 'pg';

const { Pool } = pkg;
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

const pool = new Pool({
  host: '',
  user: '',
  password: '',
  database: '',
  port: 3002
});

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS denuncias (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER NOT NULL,
      texto TEXT NOT NULL,
      midia TEXT,
      criado_em TIMESTAMP DEFAULT NOW()
    );
  `);
};
createTable();

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'segredo123');
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};

app.post('/denuncia/nova', verificarToken, upload.single('midia'), async (req, res) => {
  try {
    const { texto } = req.body;
    const midia = req.file ? req.file.path : null;

    if (!texto) return res.status(400).json({ erro: 'Texto da denúncia é obrigatório' });

    const result = await pool.query(
      'INSERT INTO denuncias (usuario_id, texto, midia) VALUES ($1, $2, $3) RETURNING *',
      [req.usuario.id, texto, midia]
    );

    res.json({ sucesso: true, denuncia: result.rows[0] });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar denúncia', detalhes: error });
  }
});


app.get('/denuncia/listar', verificarToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM denuncias ORDER BY criado_em DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar denúncias' });
  }
});

app.listen(3002, () => console.log('Denúncia Service rodando na porta 3002'));