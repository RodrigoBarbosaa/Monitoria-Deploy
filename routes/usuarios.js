const express = require('express');
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Validações para criação de usuário
const validarUsuario = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),
  
  body('email')
    .isEmail()
    .withMessage('Email deve ser válido')
    .normalizeEmail(),
  
  body('senha')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres')
];

// POST /usuarios - Criar novo usuário
router.post('/', validarUsuario, async (req, res) => {
  try {
    // Verificar se há erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const { nome, email, senha } = req.body;

    // Verificar se o email já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({
        success: false,
        message: 'Email já está em uso'
      });
    }

    // Criar novo usuário
    const novoUsuario = new Usuario({
      nome,
      email,
      senha
    });

    // Salvar no banco de dados
    const usuarioSalvo = await novoUsuario.save();

    // Retornar dados do usuário (sem senha)
    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: usuarioSalvo
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    
    // Erro de validação do Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }
    
    // Erro de duplicação (email único)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email já está em uso'
      });
    }
    
    // Erro genérico
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// GET /usuarios - Listar todos os usuários (opcional para testes)
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-senha');
    res.json({
      success: true,
      count: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;