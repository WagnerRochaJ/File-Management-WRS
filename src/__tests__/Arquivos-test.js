const Arquivos = require('../models/Arquivos')
const connection = require('../config/db')

describe('arquivo Model CRUD Operations', () => {
    beforeAll(async () => {
      // Sincroniza o banco de dados antes dos testes
      await connection.sync();
  
    })
    
    
    it('create new arquivo',async()=>{

      const arquivo = await Arquivos.create({description_arquivo:'sala de arquivos 90',code_arquivo:18})

      expect(arquivo.description_arquivo).toBe('sala de arquivos 90');
      expect(arquivo.code_arquivo).toBe(18);
    })

    it('should read an existing arquivo', async () => {
      const arquivo = await Arquivos.findOne({ where: { description_arquivo:"sala de arquivos 90" } });
      
      expect(arquivo.description_arquivo).toBe('sala de arquivos 90');
      expect(arquivo.code_arquivo).toBe(18);
    });
  
    it('should update an existing arquivo', async () => {
      const arquivo = await Arquivos.findOne({ where: { description_arquivo:"sala de arquivos 90" } });
      await arquivo.update({ description_arquivo:"produtora de refrigerantes" });
  
      const updatedarquivo = await Arquivos.findOne({ where: { description_arquivo:"produtora de refrigerantes" } });
      
      expect(updatedarquivo.description_arquivo).toBe("produtora de refrigerantes");
    });
  
    it('should delete an existing arquivo', async () => {
      const arquivo = await Arquivos.findOne({ where: { description_arquivo:"produtora de refrigerantes" } });
      await arquivo.destroy();
  
      const deletedarquivo = await Arquivos.findOne({ where: {description_arquivo:"produtora de refrigerantes" } });
      
      expect(deletedarquivo).toBeNull();
    })
    
    afterAll(async () => {
    
      try{
        await connection.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
        await Arquivos.truncate({ cascade: true });
        await connection.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
        await connection.close()
      }catch(err){
        console.log('Afterall error: ',err);
      }
    });
    
})