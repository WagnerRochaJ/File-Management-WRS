const {Model, DataTypes} = require('sequelize')

class Status extends Model{
    static init(sequelize){
        super.init({
          id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
            description_status:{
                type: DataTypes.STRING,
                allowNull: false,
              },
              code_status:{
                type: DataTypes.INTEGER,
                unique: true
              },
              in_possesion_third: {
                type: DataTypes.BOOLEAN,
              },
        },{sequelize,tableName:'status',modelName:'Status'})
    }
    static associate(models){
        this.belongsTo(models.Documents,{foreignKey: 'fk_id_document'})
        this.hasMany(models.Documents, {foreignKey: 'fk_id_status'})
    }
}

module.exports = Status