const Documents = require('../models/Documents')
const Arquivos = require('../models/Arquivos')
const Privileges = require('../models/Privileges')
const Companys = require('../models/Companys')
const Status = require('../models/Status')
const Type_documents = require('../models/Type_documents')
const Corridors = require('../models/Corridors')
const Sectors = require('../models/Sectors')
const Racks = require('../models/Racks')
const Shelfs = require('../models/Shelfs')
const Boxes = require('../models/Boxes')

const connection = require('../config/db')

describe('document Model CRUD Operations', () => {
    beforeAll(async () => {
      // Sincroniza o banco de dados antes dos testes
      await connection.sync();
        
    })
    
    
    it('create new document',async()=>{
        try{ 
        const privilege = await Privileges.create({ level_privilege: 1, name_privilege: 'userDefaut' })
        const status = await Status.create({description_status:"correto", code_status:9,in_possesion_third:true})
        const type_document = await Type_documents.create({description_type_document:'notas gays',code_type_document:12,acronym_type_document:'nts'})
        const company = await Companys.create({name_company:'johnny',description_company:'produtora de bebidas',code_company:15})
        const arquivo = await Arquivos.create({description_arquivo:'sala de arquivos 90',code_arquivo:18})
        const sector = await Sectors.create({description_sector:"notas fiscais",code_sector:10,fk_id_privilege:privilege.id_privilege,fk_id_company:company.id_company})
        const corridor = await Corridors.create({ description_corridor:"corredor 03", code_corridor:3,fk_id_arquivo:arquivo.id_arquivo });
        const shelf = await Shelfs.create({ code_shelf:20, description_shelf:"estante marx",description, acronym_shelf:"emx", fk_id_corridor:corridor.id_corridor });
        const rack = await Racks.create({ code_rack:12, description_rack:"prateleira de teste", acronym_rack:"tst", fk_id_shelf:shelf.id_shelf });
        const box = await Boxes.create({description_box:"caixa de deposito", code_box:15,fk_id_rack:rack.id_rack});

        const document = await Documents.create({number_document:3,content_document:"documentos diversos",data_document:'11/09/2001',year_office:'2000', data_destruction:'01/01/2010',observation_document:"observaçao",fk_id_status:status.id_status,fk_id_typedocument:type_document.id_type_document,fk_id_company:company.id_company,fk_id_arquivo:arquivo.id_arquivo,fk_id_sector:sector.id_sector,fk_id_box:box.id_box})

        expect(document.content_document).toBe("documentos diversos");
        expect(document.year_office).toBe('2000');
        expect(document.data_document).toBe('11/09/2001');
      }catch(err){
       console.log('error to create document: ',err);  
      }
    })

    it('should read an existing document', async () => {
      try{ 
      const document = await Documents.findOne({ where: { observation_document:"observaçao"} });
      expect(document.content_document).toBe("documentos diversos");
        expect(document.year_office).toBe('2000');
        expect(document.data_document).toBe('11/09/2001');
    }catch(err){
      console.log('error to read document: ',err);  
     }
    });
  
    it('should update an existing document', async () => {
      try{
      const document = await Documents.findOne({ where: { number_document:3} });
      await document.update({ observation_document:"dados serao apagados" });
  
      const updateddocument = await Documents.findOne({ where: { number_document:3} });
      
      expect(updateddocument.observation_document).toBe("dados serao apagados");
      }catch(err){
      console.log('error to update document: ',err);  
     }
    });
  
    it('should delete an existing document', async () => {
      try{
      const document = await Documents.findOne({ where: { number_document:3} });
      await document.destroy();
  
      const deleteddocument = await Documents.findOne({ where: { number_document:3} });
      
      expect(deleteddocument).toBeNull();
      }catch(err){
      console.log('error to delete document: ',err);  
     }
    })
    
    afterAll(async () => {
    
      try{
        await connection.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
        await Documents.truncate({ cascade: true });
        await connection.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
        await connection.close()
      }catch(err){
        console.log('Afterall error: ',err);
      }
    });
    
})