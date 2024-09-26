const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        is_logged_user: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        fk_id_privilege: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "privileges",
            id: "id_privilege",
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          },
        },
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Privileges, { foreignKey: "fk_id_privilege" });
    this.belongsToMany(models.Sectors, {
      through: "users_sectors",
      foreignKey: "fk_id_user",
    });
  }
}

module.exports = Users;
