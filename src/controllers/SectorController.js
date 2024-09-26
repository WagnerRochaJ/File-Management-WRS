const Sectors = require('../models/Sectors')
const Users = require('../models/Users')

module.exports = {
    async index(req,res){
        try{

            const resp = Sectors.findOne({where:{id_sector: 3},include: Users,})
            return res.status(200).send({resposta: resp}) 
        }catch(err){
            return res.status(404).send({
                message: 'table N:M not found',
                error: err
            })
        }
    },
    async create(req,res){
        try{
            const {description,code,fkLevelPrivilege,fkCompany,users} = req.body
            const sector = await Sectors.create({description_sector:description,code_sector:code,fk_id_privilege:fkLevelPrivilege,fk_id_company:fkCompany})

            if(sector){
                if(users && users.length > 0 ){
                     await sector.setUsers(users)
                }
                return res.status(200).send({
                    message: 'sector created succesfully',
                    sector: sector,
                })
            }
        }catch(err){
            return res.status(500).send({
                message: 'error creating sector',
                error: err
            })
        }
    },
    async delete(req,res){
        try{
            const {id} = req.params
            const sector = await Sectors.findByPk(id)
            if(!sector){
                return res.status(404).send({
                    message: 'sector not found to delete'
                })
            }

            sector.destroy({where:{id_sector:id}})
            return res.status(200).send({
                message: 'sector removed seccesfully',
                sector: sector
            })
        }catch(err){
            return res.status(500).send({
                message: 'error deleting sector',
                error: err
            })
        }
    },
    async update(req,res){
        try {
            const { id } = req.params;
            const { description,code,fkLevelPrivilege,fkCompany,users} = req.body;
            const sector = await Sectors.findByPk(id);
            if (!sector) return res.status(404).json({ error: 'Sector not found' });
        
            await sector.update({ description, code, empresaId });
            if (usuarios) {
              await sector.setUsuarios(usuarios);
            }
            res.status(200).json({
                message: "sector updated sucessfully",
                sector: sector
            });
          } catch (error) {
            res.status(500).json({ error: 'Erro deleting sector' });
        }
    }
}