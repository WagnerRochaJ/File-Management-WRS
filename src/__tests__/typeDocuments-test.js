const Type_Documents = require('../models/Type_documents')
const connection = require('../config/db')

describe('type_document Model CRUD Operations', () => {
    beforeAll(async () => {
      // Sincroniza o banco de dados antes dos testes
      await connection.sync();
  
    })
    
    
    it('create new type_document',async()=>{
      try{ 
        const type_document = await Type_Documents.create({description_type_document:'notas gays',code_type_document:12,acronym_type_document:'nts'})
        expect(type_document.description_type_document).toBe('notas gays');
        expect(type_document.code_type_document).toBe(12);
        expect(type_document.acronym_type_document).toBe('nts');
      }catch(err){
       console.log('error to create typedocument: ',err);  
      }
    })

    it('should read an existing type_document', async () => {
      try{ 
      const type_document = await Type_Documents.findOne({ where: { description_type_document:"notas gays" } });
      expect(type_document.description_type_document).toBe('notas gays');
      expect(type_document.code_type_document).toBe(12);
      expect(type_document.acronym_type_document).toBe('nts');
    }catch(err){
      console.log('error to read typedocument: ',err);  
     }
    });
  
    it('should update an existing type_document', async () => {
      try{
      const type_document = await Type_Documents.findOne({ where: { description_type_document:"notas gays" } });
      await type_document.update({ description_type_document:"contas a pagar" });
  
      const updatedtype_document = await Type_Documents.findOne({ where: { description_type_document:"contas a pagar" } });
      
      expect(updatedtype_document.description_type_document).toBe("contas a pagar");
      }catch(err){
      console.log('error to update typedocument: ',err);  
     }
    });
  
    it('should delete an existing type_document', async () => {
      try{
      const type_document = await Type_Documents.findOne({ where: { description_type_document:"contas a pagar" } });
      await type_document.destroy();
  
      const deletedtype_document = await Type_Documents.findOne({ where: {description_type_document:"contas a pagar" } });
      
      expect(deletedtype_document).toBeNull();
      }catch(err){
      console.log('error to delete typedocument: ',err);  
     }
    })
    
    afterAll(async () => {
    
      try{
        await connection.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
        await Type_Documents.truncate({ cascade: true });
        await connection.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
        await connection.close()
      }catch(err){
        console.log('Afterall error: ',err);
      }
    });
    
})