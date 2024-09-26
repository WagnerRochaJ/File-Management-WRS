const { Model, DataTypes } = require("sequelize");

class Sectors extends Model {
  static init(sequelize) {
    super.init(
      {
        id_sector: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        description_sector: DataTypes.TEXT("tiny"),
        code_sector: DataTypes.SMALLINT,
        fk_id_privilege: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "privileges",
            key: "id_privilege",
          },
        },
        fk_id_company: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "companys",
            key: "id_company",
          },
        },
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.belongsTo(models.Companys, { foreignKey: "fk_id_company" });
    this.belongsTo(models.Privileges, { foreignKey: "fk_id_privilege" });
    this.belongsToMany(models.Users, {
      through: "users_sectors",
      foreignKey: "fk_id_sector",
    });
  }
}

module.exports = Sectors;
