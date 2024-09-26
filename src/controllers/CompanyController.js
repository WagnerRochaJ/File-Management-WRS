const Companys = require('../models/Companys')

module.exports = {
    async create(req,res){
        try{
            const {name,description,code} = req.body
            const company = await Companys.create({name_company:name,description_company:description,code_company:code})

                return res.status(200).send({
                    message: 'company created succesfully',
                    company: company
                })
        }catch(err){
            return res.status(500).send({
                message: 'error when creating company',
                error: err
            })
        }
    },
}