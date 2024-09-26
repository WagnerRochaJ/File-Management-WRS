const Users = require("../models/Users");
const Sectors = require('../models/Sectors')
const Privileges = require("../models/Privileges");
const connection = require("../config/db");
const { QueryInterface } = require("sequelize");

describe("User Model CRUD Operations", () => {
  beforeAll(async () => {
    await connection.sync(); // Sincroniza, sem forçar o drop
  });

  it("create new user", async () => {
    const privilege = await Privileges.create({
      level_privilege: 1,
      name_privilege: "userDefaut",
    });
    console.log("user created successfully");
    const user = await Users.create({
      username: "João Silva",
      password: "password123",
      fk_id_privilege: privilege.id_privilege,
    });

    expect(user.password).toBe("password123");
  });

  it("should read an existing user", async () => {
    const user = await Users.findOne({ where: { username: "João Silva" } });

    expect(user.username).toBe("João Silva");
    expect(user.password).toBe("password123");
    
  });

  it("should update an existing user", async () => {
    const user = await Users.findOne({ where: { username: "João Silva" } });
    await user.update({ username: "João Atualizado" });

    const updateduser = await Users.findOne({
      where: { username: "João Atualizado" },
    });

    expect(updateduser.username).toBe("João Atualizado");
  });

  it("should delete an existing user", async () => {
    const user = await Users.findOne({
      where: { username: "João Atualizado" },
    });
    await user.destroy();

    const deleteduser = await Users.findOne({
      where: { username: "João Atualizado" },
    });

    expect(deleteduser).toBeNull();
  });

  afterAll(async () => {
    
    try{
      await connection.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
      //await Users.removeSectors(Sectors)
      await Users.truncate({ cascade: true });
      await Privileges.truncate({ cascade: true });
      await connection.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
      await connection.close()
    }catch(err){
      console.log('Afterall error: ',err);
    }
    
  });
});
