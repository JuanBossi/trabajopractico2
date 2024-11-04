const { INTEGER, Op } = require('sequelize');
const { Students } = require('../model/students');


const getLastStudentSid = async () => {
    try {
        let lastStudent = await Students.findOne({
        attributes: ['sid'],
        order: [['id', 'DESC']]
      });
      console.log(lastStudent);
      
      if (lastStudent) {
        return lastStudent.sid + 1; 
    } else {
        return 1; 
    }
    } catch (error) {
      console.error('Error al obtener el sid del último estudiante:', error);
      throw error; 
    }
};

const create = async (student) => {
    try {
        if (typeof student === 'string') {
            student = JSON.parse(student);
        }

        const dniNumber = parseInt(student.dni);
        const email = student.email;


        const newSid = await getLastStudentSid();

        const newStudent = await Students.create({
            sid: newSid, 
            firstname: student.name,
            lastname: student.lastname,
            dni: dniNumber,
            email: email,
            deleted: 0
        });
        return newStudent;
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

const getAll = async (search = '', currentPage = 1, pageSize = 5) => {
    try {
        const students = await Students.getAll(search, currentPage, pageSize);
        return students;
    } catch (error) {
        console.error('Error al recuperar los estudiantes:', error);
        throw error;
    }
};


module.exports = {
    getLastStudentSid,
    create,
    deleteById,
    getAll,
};
