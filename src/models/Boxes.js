const { Model, DataTypes } = require("sequelize");

class Boxes extends Model {
  static init(sequelize) {
    super.init(
      {
        id_box: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        description_box: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code_box: {
          type: DataTypes.INTEGER,
          unique: true,
        },
        fk_id_rack:{
          type: DataTypes.INTEGER,
          allowNull: false,
          references:{
            model: 'racks',
            key: 'id_rack'
          }
        },
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.belongsTo(models.Racks, { foreignKey: "fk_id_rack" });
    this.hasMany(models.Documents, { foreignKey: "fk_id_box" });
  }
}
module.exports = Boxes