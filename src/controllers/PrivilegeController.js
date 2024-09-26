const Privileges = require('../models/Privileges')

function defineNameLevel(level) {
    switch (level) {
        case 1:
            return "userDefault";
        case 2:
            return "supervisor";
        case 3:
            return "administrator";
        default:
            return null;
    }
}

module.exports = {
    async index(req, res){
        const privilegeList = await Privileges.findAll()
        return res.status(200).send({
            status: 1,
            message: `tables list = `,
            privilegeList
        })
    },
    async create(req, res) {
        const { level } = req.body;

        if (level === undefined) {
            return res.status(400).send({
                status: 0,
                message: "Level is undefined"
            });
        }

        const privilegeExist = await Privileges.findOne({ where: { level_privilege: level } });
        if (privilegeExist) {
            return res.status(400).send({
                status: 0,
                message: "Existing privilege"
            });
        }

        const name = defineNameLevel(level);
        if (name === null) {
            return res.status(400).send({
                status: 0,
                message: "Invalid level"
            });
        }

        try {
            const privilege = await Privileges.create({ level_privilege: level, name_privilege: name });
            return res.status(200).send({
                status: 1,
                message: "Privilege created",
                privilege
            });
        } catch (error) {
            return res.status(500).send({
                status: 0,
                message: "Error creating privilege",
                error: error.message
            });
        }
    },
    async delete(req,res){
        try{
            const {id} = req.params
            const privilege = await Privileges.findByPk(id)
            if(!privilege){
                return res.status(404).send({message: 'privilege not found'})
            }
            await privilege.destroy()
            return res.status(200).send({message: 'privilege succesfully destroyed'})
        }catch(err){
            return res.status(500).send({
                message: 'error when deleting privilege',
                error: err,
            },)
        }
    },
    async update(req,res){
        try{

            const {id} = req.params
            const {level} = req.body
            
            const privilege = await Privileges.findByPk(id)
            if(!privilege){
                return res.status(404).send({message: 'privilege not found'})
            }
            await privilege.update(level)
            return res.status(200).send({message: 'privilege updated succesfully'})
        }catch(err){
            return res.status(500).send({
                message: 'error updating privilege  ',
                error: err
            })
        }
    },
    async delete(req,res){
        try{

            const {id} = req.params
            
            const privilege = await Privileges.findByPk(id)
            if(!privilege){
                return res.status(404).send({message: 'privilege not found'})
            }
            await privilege.update(level)
            return res.status(200).send({message: 'privilege deleted succesfully'})
        }catch(err){
            return res.status(500).send({
                message: 'error updating privilege  ',
                error: err
            })
        }
    }
}
