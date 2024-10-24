const { DataTypes, Model } = require("sequelize");
//const Levels = require("./levels");

class Students extends Model {
  static init = (sequelize) => {
    super.init(
      {
        id: {
            type: DataTypes.TINYINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        sid: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deleted: {
            type: DataTypes.TINYINT,
            values: [0, 1],
            defaultValue: 0
        }
      }, // attributes
      {
        sequelize,
        modelName: 'students',
      }
    );
    return this;
  };

  /*static associate = models => {
    this.hasMany(models.Levels, {
      foreignKey: 'careers_id',
      as: 'levels'
    });
  };
*/
  static getAll = async () => {
    return await this.findAll({
      where: {
        deleted: 0
      },
      attributes: {
        exclude: 'deleted, createdAt, updatedAt'
      }
    });
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

  /*static updateById = async (id, payload) => {
    return await this.update(payload, {
      where: {
        id
      }
    });
  };

  static deleteById = async (id) => {
    return await this.update(
      {
        deleted: 1
      },
      {
        where: {
          id
        }
      }
    );
  };*/
};

module.exports = {
    Students
};
