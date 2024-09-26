const Companys = require('../models/Companys')
const connection = require('../config/db')

describe('company Model CRUD Operations', () => {
    beforeAll(async () => {
      
        await connection.sync();
        console.log("Banco de dados sincronizado com sucesso.");
  
    })
    
    
    it('create new company',async()=>{
      try{

        const company = await Companys.create({name_company:'johnny',description_company:'produtora de bebidas',code_company:15})
        
        expect(company.name_company).toBe('johnny');
        expect(company.description_company).toBe('produtora de bebidas');
        expect(company.code_company).toBe(15);
        console.log('company created successfully ');
      }catch(err){
        console.log('error to create company: ',err);
      }
      })
      
    it('should read an existing company', async () => {
      const company = await Companys.findOne({ where: { description_company:"produtora de bebidas" } });
      
      expect(company.description_company).toBe('produtora de bebidas');
      expect(company.name_company).toBe('johnny');
      expect(company.code_company).toBe(15);
    });
  
    it('should update an existing company', async () => {
      const company = await Companys.findOne({ where: { description_company:"produtora de bebidas" } });
      await company.update({ description_company:"produtora de refrigerantes" });
  
      const updatedcompany = await Companys.findOne({ where: { description_company:"produtora de refrigerantes" } });
      
      expect(updatedcompany.description_company).toBe("produtora de refrigerantes");
    });
  
    it('should delete an existing company', async () => {
      const company = await Companys.findOne({ where: { description_company:"produtora de refrigerantes" } });
      await company.destroy();
  
      const deletedcompany = await Companys.findOne({ where: {description_company:"produtora de refrigerantes" } });
      
      expect(deletedcompany).toBeNull();
    })
    afterAll(async () => {
    
      try{
        await connection.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
        await Companys.truncate({ cascade: true });
        await connection.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
        await connection.close()
      }catch(err){
        console.log('Afterall error: ',err);
      }
      
    });
})