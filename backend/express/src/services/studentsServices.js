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

const create = async (student) => {
    try {
        if (typeof student === 'string') {
            student = JSON.parse(student);
        }
        let dniNumber = parseInt(student.dni);

        console.log(student.name);
        console.log(student.lastname);
        console.log(dniNumber);
        console.log(student.email);

        const newStudent = await Students.create({
            sid: 15,
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
    create,
    updateById,
    deleteById
};
