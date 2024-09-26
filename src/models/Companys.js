const { Model, DataTypes } = require("sequelize");

class Companys extends Model {
  static init(sequelize) {
    super.init(
      {
        id_company: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name_company: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        description_company: DataTypes.TEXT("tiny"),
        code_company: DataTypes.SMALLINT,
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.hasMany(models.Sectors, {
      foreignKey: "fk_id_company",
    }),
      this.hasMany(models.Documents, {
        foreignKey: "fk_id_company",
      });
  }
}

module.exports = Companys
