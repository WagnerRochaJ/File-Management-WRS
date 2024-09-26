const { Model, DataTypes } = require("sequelize");

class Corridors extends Model {
  static init(sequelize) {
    super.init(
      {
        id_corridor: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        description_corridor: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        code_corridor: {
          type: DataTypes.INTEGER,
          unique: true,
        },
        fk_id_arquivo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "arquivos",
            key: "id_arquivo",
          },
        },
        acronym_corridor: DataTypes.STRING(1),
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.belongsTo(models.Arquivos, { foreignKey: "fk_id_arquivo" });
    this.hasMany(models.Shelfs, { foreignKey: "fk_id_corridor" });
  }
}

module.exports = Corridors