const { Model, DataTypes } = require('sequelize');

class Privileges extends Model {
    static init(sequelize) {
        super.init({
            id_privilege: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
              },
            level_privilege: {
                type: DataTypes.SMALLINT,
                allowNull: false
            },
            name_privilege: DataTypes.STRING(30),
        }, {
            sequelize,
            modelName: 'Privileges',
            tableName: 'privileges',
            timestamps: true
        });
    }

    static associate(models) {
        this.hasMany(models.Users, { foreignKey: 'fk_id_privilege' });
    }
}

module.exports = Privileges;
