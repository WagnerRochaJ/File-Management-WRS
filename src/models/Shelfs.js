const { Model, DataTypes } = require("sequelize");

class Shelfs extends Model {
  static init(sequelize) {
    super.init(
      {
        id_shelf: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        description_shelf: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code_shelf: {
          type: DataTypes.INTEGER,
          unique: true,
        },
        acronym_shelf: {
          type: DataTypes.STRING(1),
        },
        fk_id_corridor: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "corridors",
            key: "id_corridor",
          },
        },
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.belongsTo(models.Documents, { foreignKey: "fk_id_corridor" });
    this.hasMany(models.Racks, { foreignKey: "fk_id_shelf" });
  }
}

module.exports = Shelfs
