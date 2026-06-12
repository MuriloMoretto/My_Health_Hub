const router  = require('express').Router();
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const db      = require('../db');

// ─── Cadastro ────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  const { nome, email, senha, telefone, data_nascimento, cpf, tipo_usuario } = req.body;

  if (!nome || !email || !senha || !telefone || !data_nascimento || !cpf || !tipo_usuario) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    // ✅ NORMALIZAR EMAIL E SENHA
    const emailNormalizado = email.toLowerCase().trim();
    const senhaTrimada = senha.trim();
    
    const hash = await bcrypt.hash(senhaTrimada, 10);
    const [result] = await db.execute(
      `INSERT INTO Usuario (nome, email, senha, telefone, data_nascimento, cpf, tipo_usuario)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, emailNormalizado, hash, telefone, data_nascimento, cpf, tipo_usuario]
    );

    const id = result.insertId;

    if (tipo_usuario === 'cliente') {
      await db.execute('INSERT INTO Perfil_Cliente (id_usuario) VALUES (?)', [id]);
    } else {
      const cref = req.body.cref || '';
      await db.execute(
        'INSERT INTO Perfil_Profissional (id_usuario, cref) VALUES (?, ?)',
        [id, cref]
      );
    }

    const token = jwt.sign(
      { id, nome, email: emailNormalizado, tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, user: { id, nome, email: emailNormalizado, tipo_usuario } });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email, CPF ou telefone já cadastrado' });
    }
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// ─── Login ───────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    // ✅ NORMALIZAR EMAIL E SENHA
    const emailNormalizado = email.toLowerCase().trim();
    const senhaTrimada = senha.trim();
    
    const [rows] = await db.execute(
      'SELECT * FROM Usuario WHERE email = ?', 
      [emailNormalizado]  // ← EMAIL NORMALIZADO
    );

    if (!rows.length) {
      console.log(`❌ Email não encontrado: ${emailNormalizado}`); // DEBUG
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(senhaTrimada, user.senha);  // ← SENHA TRIMADA

    if (!match) {
      console.log(`❌ Senha inválida para: ${emailNormalizado}`); // DEBUG
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id_usuario, nome: user.nome, email: user.email, tipo_usuario: user.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id:          user.id_usuario,
        nome:        user.nome,
        email:       user.email,
        tipo_usuario: user.tipo_usuario,
        initials:    user.nome.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// ─── Perfil do usuário logado ─────────────────────────────────
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id_usuario, nome, email, tipo_usuario, telefone FROM Usuario WHERE id_usuario = ?',
      [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

module.exports = router;