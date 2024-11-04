const { Op } = require('sequelize');
const { Students } = require('../model/students');

const validateBody = (req, res, next) => {
    if (!req.body.name) {
      res.status(400).json({
          message: 'name field is required.'
      });
      return;
    }
    if (!req.body.lastname) {
      res.status(400).json({
          message: 'lastName field is required.'
        });
      return;
    }
    if (!Number.isInteger(Number(req.body.dni))) {
      res.status(400).json({
          message: 'dni must be a number'
        });
      return;
    }
  next();
};

const existsStudentWithDniOrEmail = async (req, res, next) => {
  try {
    const { dni, email } = req.body; 

    const student = await Students.findOne({
      where: {
        [Op.or]: [
          { dni: parseInt(dni), deleted: 0 },   
          { email: email, deleted: 0 } 
        ]
      }
    });

    if (student) {
      res.status(400).json({ message: 'Ya existe un estudiante con ese DNI o email.' });
      return;
    }

    next();
  } catch (error) {
    console.error('Error al verificar el DNI o email:', error);
    res.status(500).json({ message: 'Error del servidor al verificar el DNI o email.' });
  }
};


const validateById = (req, res, next) => {
  
  if (isNaN(Number(req.params.id))) {
    res.status(400).json({
      message: 'id must be number'
    });
    return;
  }

  req.params.id = Number(req.params.id);

  next();
};

const validateURLQuery = (req, res, next) => {
  const { search = '', currentPage = '1', pageSize = '5' } = req.query;

  if (search && typeof search !== 'string') {
    return res.status(400).json({ error: 'El parámetro "search" debe ser una cadena de texto.' });
  }

  if (currentPage && (!Number.isInteger(Number(currentPage)) || Number(currentPage) <= 0)) {
    return res.status(400).json({ error: 'El parámetro "currentPage" debe ser un entero positivo.' });
  }

  if (pageSize && (!Number.isInteger(Number(pageSize)) || Number(pageSize) <= 0)) {
    return res.status(400).json({ error: 'El parámetro "pageSize" debe ser un entero positivo.' });
  }

  req.query.search = search || ''
  req.query.currentPage = parseInt(currentPage) || '1';
  req.query.pageSize = parseInt(pageSize) || '5';

  next();
};

module.exports = {
  validateBody,
  validateById,
  validateURLQuery,
  existsStudentWithDniOrEmail
}