const { Model, DataTypes } = require("sequelize");

class Documents extends Model {
  static init(sequelize) {
    super.init(
      {
        id_document: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        number_document: DataTypes.SMALLINT,
        content_document: DataTypes.TEXT,
        data_document: DataTypes.DATEONLY,
        year_office: DataTypes.STRING(1),
        data_destruction: DataTypes.DATEONLY,
        observation_document: DataTypes.STRING,
        fk_id_status: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "status",
            key: "id_status",
          },
        },
        fk_id_typedocument: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "type_documents",
            key: "id_type_document",
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
        fk_id_arquivo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "arquivos",
            key: "id_arquivo",
          },
        },
        fk_id_sector: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "sectors",
            key: "id_sector",
          },
        },
        fk_id_box: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "boxes",
            key: "id_box",
          },
        },
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.belongsTo(models.Status, { foreignKey: "fk_id_status" });
    this.belongsTo(models.Type_documents, { foreignKey: "fk_id_typedocument" });
    this.belongsTo(models.Companys, { foreignKey: "fk_id_company" });
    this.belongsTo(models.Arquivos, { foreignKey: "fk_id_arquivo" });
    this.belongsTo(models.Sectors, { foreignKey: "fk_id_sector" });
    this.belongsTo(models.Boxes, { foreignKey: "fk_id_box" });
  }
}

module.exports = Documents;
