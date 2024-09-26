const Privileges = require('../models/Privileges')
const connection = require('../config/db')

describe('privilege Model CRUD Operations', () => {
    beforeAll(async () => {
      // Sincroniza o banco de dados antes dos testes
      await connection.sync();
  
    })
    
    
    it('create new privilege',async()=>{

      const privilege = await Privileges.create({name_privilege:'userdefault',level_privilege:1})

      expect(privilege.name_privilege).toBe('userdefault');
      expect(privilege.level_privilege).toBe(1);
    })

    it('should read an existing privilege', async () => {
      const privilege = await Privileges.findOne({ where: {name_privilege:'userdefault' } });
      
      expect(privilege.level_privilege).toBe(1);
      expect(privilege.name_privilege).toBe('userdefault');
    });
  
    it('should update an existing privilege', async () => {
      const privilege = await Privileges.findOne({ where: { level_privilege:1 } });
      await privilege.update({ level_privilege:2 });
  
      const updatedprivilege = await Privileges.findOne({ where: { level_privilege:2 } });
      
      expect(updatedprivilege.level_privilege).toBe(2);
    });
  
    it('should delete an existing privilege', async () => {
      const privilege = await Privileges.findOne({ where: {name_privilege:'userdefault' } });
      await privilege.destroy();
  
      const deletedprivilege = await Privileges.findOne({ where: {name_privilege:'userdefault' }});
      
      expect(deletedprivilege).toBeNull();
    })

    afterAll(async () => {
      try{
        await connection.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
        await Privileges.truncate({ cascade: true });
        await connection.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
        await connection.close()
      }catch(err){
        console.log('Afterall error: ',err);
      }
    });
})