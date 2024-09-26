const Sectors = require('../models/Sectors')
const Privileges = require('../models/Privileges')
const Companys = require('../models/Companys')
const connection = require('../config/db')

describe('Sector Model CRUD Operations', () => {
    beforeAll(async () => {
      // Sincroniza o banco de dados antes dos testes
      await connection.sync();
  
    })
    
    
    it('create new sector',async()=>{
      const privilege = await Privileges.create({ level_privilege: 1, name_privilege: 'userDefaut' })

      const company = await Companys.create({name_company:'johnny',description_company:'produtora de bebidas',code_company:15})

      const sector = await Sectors.create({description_sector:"notas fiscais",code_sector:10,fk_id_privilege:privilege.id_privilege,fk_id_company:company.id_company})

      expect(sector.description_sector).toBe('notas fiscais');
      expect(sector.code_sector).toBe(10);
    })

    it('should read an existing sector', async () => {
      const sector = await Sectors.findOne({ where: { description_sector:"notas fiscais" } });
      
      expect(sector.description_sector).toBe('notas fiscais');
      expect(sector.code_sector).toBe(10);
    });
  
    it('should update an existing sector', async () => {
      const sector = await Sectors.findOne({ where: { description_sector:"notas fiscais" } });
      await sector.update({ description_sector:"videos de maio" });
  
      const updatedsector = await Sectors.findOne({ where: { description_sector:"videos de maio" } });
      
      expect(updatedsector.description_sector).toBe("videos de maio");
    });
  
    it('should delete an existing sector', async () => {
      const sector = await Sectors.findOne({ where: { description_sector:"videos de maio" } });
      await sector.destroy();
  
      const deletedsector = await Sectors.findOne({ where: {description_sector:"videos de maio" } });
      
      expect(deletedsector).toBeNull();
    })

    afterAll(async () => {
    
      try{
        await connection.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
        await Sectors.truncate({ cascade: true });
        await Privileges.truncate({ cascade: true });
        await Companys.truncate({ cascade: true });
        await connection.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
        await connection.close()
      }catch(err){
        console.log('Afterall error: ',err);
      }
      
    });
})