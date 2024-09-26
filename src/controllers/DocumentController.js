const Documents = require('../models/Documents')
const Users = require('../models/Users')

module.exports = {
    async index(req,res){
        const {user_id} = req.params;

        const user = await Users.findByPk(user_id,{
            include: {association: 'document'}
        })

        if(!user){
            return res.status(400).send({
                status: 0,
                message: "document not found"
            })
        }
        return res.status(200).send(user.document)
    },
    async get(req,res){
        const document = await Documents.findAll({include:['type_document','status','box']})

        return res.status(200).send({
            message: 'all documents list with associations: ',
            doc: document
        })
    },
    async store(req,res){
        const {number_document,content_document,data_document,year_office, data_destruction,observation_document,fk_id_status,fk_id_typedocument,fk_id_company,fk_id_arquivo,fk_id_sector,fk_id_box} = req.body
        try{
            const document = await Documents.create({number_document,content_document,data_document,year_office, data_destruction,observation_document,fk_id_status,fk_id_typedocument,fk_id_company,fk_id_arquivo,fk_id_sector,fk_id_box})
            return res.status(200).send({
                status: 1,
                message: 'document registered!',
                document
            })
        }catch(err){
            res.status(500).json({error: 'fetching document failed! \nERR: '+err})
        }

    },
    async update(req,res){
        const {number_document,content_document,data_document,year_office, data_destruction,observation_document} = req.body;
        const {document_id} = req.params;

        await Documents.update({
            number_document,content_document,data_document,year_office, data_destruction,observation_document,fk_id_status,fk_id_typedocument,fk_id_company,fk_id_arquivo,fk_id_sector,fk_id_box
        },{
            where:{
                id: document_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "document successfull updated "
        })
    },
    async delete(req,res){
        const {document_id} = req.params;
        await Documents.destroy({
                where: {
                    id: document_id
                }
            }
        )
        return res.status(200).send({
            status: 1,
            message: "document deleted with id: "+ document_id})
    }
}