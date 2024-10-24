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
        const career = await Students.getById(id);

        return career;
    } catch (error) {
        console.error('studentsServices: ' + error);
        throw error;
    }
};

const create = async (career) => {
    try {
        const newCareer = await Students.create({ name: career.name });

        return newCareer;
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
