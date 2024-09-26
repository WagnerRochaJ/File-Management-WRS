const { Model, DataTypes } = require("sequelize");

class Racks extends Model {
  static init(sequelize) {
    super.init(
      {
        id_rack: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        description_rack: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code_rack: {
          type: DataTypes.INTEGER,
          unique: true,
        },
        acronym_rack: {
          type: DataTypes.STRING(1),
        },
        fk_id_shelf: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "shelfs",
            key: "id_shelf",
          },
        },
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.belongsTo(models.Documents, { foreignKey: "fk_id_shelf" });
    this.hasMany(models.Boxes, { foreignKey: "fk_id_rack" });
  }
}
module.exports = Racks
