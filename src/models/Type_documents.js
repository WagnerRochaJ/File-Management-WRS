const {Model, DataTypes} = require('sequelize')

class Type_documents extends Model{
    static init(sequelize){
        super.init({
          id_type_document: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
            description_type_document:{
                type: DataTypes.STRING,
                allowNull: false,
              },
              code_type_document:{
                type: DataTypes.INTEGER,
                unique: true
              },
              acronym_type_document: {
                type: DataTypes.STRING(3),
              },
        },{sequelize})
    }
    static associate(models){
        this.hasMany(models.Documents, {foreignKey: 'fk_id_typedocument'})
    }
}
module.exports = Type_documents
