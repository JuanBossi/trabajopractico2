const { INTEGER } = require('sequelize');
const { Students } = require('../model/students');

const findAll = async () => {
    try {
        const students = await Students.getAll();
        return students;
    } catch (error) {
        console.error('studentsServices: ' + error);
        throw error;
    }
};

const findById = async (id) => {
    try {
        const student = await Students.getById(id);

        return student;
    } catch (error) {
        console.error('studentsServices: ' + error);
        throw error;
    }
};

const getLastStudentSid = async () => {
    try {
        let lastStudent = await Students.findOne({
        attributes: ['sid'],
        order: [['id', 'DESC']]
      });
      console.log(lastStudent);
      // Si existe un estudiante, devuelve su 'sid'
      if (lastStudent) {
        return lastStudent.sid;
      } else {
        // Si no hay estudiantes en la tabla, devuelve null o el valor que prefieras
        console.log("aca si");
        return 1;
      }
    } catch (error) {
      console.error('Error al obtener el sid del último estudiante:', error);
      throw error; // Propaga el error para que se maneje más arriba en la cadena
    }
};

const create = async (student) => {
    try {
        if (typeof student === 'string') {
            student = JSON.parse(student);
        }
        let dniNumber = parseInt(student.dni);

        const newStudent = await Students.create({
            sid: 15,//newSid,
            firstname: student.name,
            lastname: student.lastname,
            dni: dniNumber,
            email: student.email,
            deleted: 0
          })
        return newStudent;
    } catch (error) {
        console.error('studentsServices: ' + error);
        throw error;
    }
};

const updateById = async (id, payload) => {
    try {
        await Students.updateById(id,  { name: payload.name });
    } catch (error) {
        console.error('studentsServices: ' + error);
        throw error;
    }
};

const deleteById = async (id) => {
    try {
        await Students.deleteById(id);
    } catch (error) {
        console.error('studentsServices: ' + error);
        throw error;
    }
};




module.exports = {
    findAll,
    findById,
    getLastStudentSid,
    create,
    updateById,
    deleteById
};
