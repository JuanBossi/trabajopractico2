const express = require('express');

const { create, deleteById, getAll } = require('../services/studentsServices');
const { validateById, validateBody, validateURLQuery, existsStudentWithDniOrEmail } = require('../middleware/studentsMiddleware');

const router = express.Router();

router.get('/',validateURLQuery, async (req, res) => {
    try {
        
        const result = await getAll(req.query.search, req.query.currentPage, req.query.pageSize);

        if (result.data.length === 0) {
            return res.status(404).json({ message: 'No se encontraron registros.' });
        }

        res.json(result);
    } catch (error) {
        console.error('Error en la recuperación de estudiantes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.post('/', validateBody,existsStudentWithDniOrEmail, async (req, res) => {
    try {
        const newStudent = await create(req.body);
        res.json(newStudent);
    } catch (error) {
        res.sendStatus(500);
    } 
});

router.delete('/:id', validateById, async (req, res) => {
    try {
        await deleteById(req.params.id);
        res.json({ message: 'Estudiante eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        res.sendStatus(500);
    }
});

module.exports = router;
