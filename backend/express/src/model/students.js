const { DataTypes, Model, Op } = require("sequelize");


class Students extends Model {
  static init = (sequelize) => {
    super.init(
      {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        sid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        dni: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        deleted: {
            type: DataTypes.TINYINT,
            values: [0, 1],
            defaultValue: 0
        }
      }, 
      {
        sequelize,
        modelName: 'students',
      }
    );
    return this;
  };


  static getAll = async (search = '', currentPage = 1, pageSize = 5) => {
    return await this.findAllWithPagination(search, currentPage, pageSize);
  };

  static getById = async (id) => {
    return await this.findOne({
      where: {
        deleted: 0,
        id
      },
      attributes: {
        exclude: 'deleted, createdAt, updatedAt'
      }
    });
  };

  static deleteById = async (id) => {
    try {
        const result = await this.update(
            { deleted: 1 },
            { where: { id } }
        );
        return result;
    } catch (error) {
        console.error('Error al marcar como eliminado:', error);
        throw error;
    }
};

static findAllWithPagination = async (search, currentPage, pageSize) => {
    const offset = (currentPage - 1) * pageSize;
    const whereClause = {
      deleted: 0,
      lastname: { [Op.substring]: search }
    };

    const { count, rows } = await this.findAndCountAll({
      where: whereClause,
      limit: pageSize,
      offset
    });

    return {
      data: rows,
      totalRecords: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage
    };
  };
};

module.exports = {
    Students
};
