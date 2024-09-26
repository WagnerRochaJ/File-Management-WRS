const {Model, DataTypes} = require('sequelize')

class Arquivos extends Model{
    static init(sequelize){
        super.init({
            id_arquivo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
              },
            description_arquivo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            code_arquivo: {
                type: DataTypes.INTEGER,
                unique: true
            },
        },{sequelize,modelName:"Arquivos",tableName:"arquivos"},)
    }
    static associate(models){
        this.belongsTo(models.Company, {foreignKey: 'fk_id_company'})
        this.hasMany(models.Corridors, {foreignKey: 'fk_id_arquivo'})
    }
}

module.exports = Arquivos