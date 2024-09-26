const Sectors = require('../models/Sectors')
const Privileges = require('../models/Privileges')
const Users = require('../models/Users')
const Companys = require('../models/Companys')
const connection = require('../config/db')

describe('users_sectors Model CRUD Operations', () => {
    beforeAll(async () => {
      // Sincroniza o banco de dados antes dos testes
      await connection.sync();

      const privilege = await Privileges.create({ level_privilege: 1, name_privilege: 'userDefaut' })
      const user = await Users.create({username:'João Silva',password:'password123',fk_id_privilege:privilege.id_privilege})
      const company = await Companys.create({name_company:'johnny',description_company:'produtora de bebidas',code_company:15})
      const sector = await Sectors.create({description_sector:"notas fiscais",code_sector:10,fk_id_privilege:1,fk_id_company:company.id_company})
    })
    
    
    it('associate user_sectors',async()=>{
        const user = await Users.findOne({where: {username:'João Silva'}})
        const sector = await Sectors.findOne({where: {description_sector:"notas fiscais"}})
      
        await user.addSectors(sector)

        const sectorsAssociate = await user.getSectors();

        expect(sectorsAssociate.length).toBe(1)
        expect(sectorsAssociate[0].description_sector).toBe('notas fiscais')
    })
    
    afterAll(async () => {
      const user = await Users.findOne({where: {username:'João Silva'}})
      const sector = await Sectors.findOne({where: {description_sector:"notas fiscais"}})
      try{
        await connection.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
        await user.removeSectors(sector)
        await Users.truncate({cascade:true})
        await Companys.truncate({cascade: true})
        await Privileges.truncate({ cascade: true });
        await connection.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
        await connection.close()
      }catch(err){
        console.log('Afterall error: ',err);
      }
    });
})