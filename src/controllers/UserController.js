const Users = require('../models/Users')
const Privileges = require('../models/Privileges')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {expiresIn: 10800,})
}

module.exports={
    async index(req,res){
        //const {username,password,is_logged_user} = req.body;
        const user = await Users.findAll()
        if(user == null || user == ""){
            return res.status(400).send({
                message:'no users registered'
            })
        }
        return res.status(200).send({
            message: 'There are registered users',
            user
        })
    },
    async login(req,res){
        const {username,password,is_logged_user} = req.body;
        const user = await Users.findOne({where: {username} });

        if(!user){
            return res.status(400).send({
                status: 0,
                message: 'user or password incorrect'
            })
        }
        if(!bcrypt.compareSync(password,user.password)){
            return res.status(400).send({
                status:0,
                message: 'user or password incorrect'
            })
        }
        const user_id = user.id_user

        await Users.update({is_logged_user},{where: {
            id_user : user_id
        }})

        user.password = undefined
        const token = generateToken({id: user.id})

        return res.status(200).send({
            status: 1,
            message: 'user logged in successfully',
            user, token
        })
    },
    async store(req,res){
        const {username,password,fkLevelPrivilege} = req.body
        
        levelFound = await Privileges.findOne({where: {level_privilege: fkLevelPrivilege}})
        if(!levelFound){
            return res.status(400).send({
                status: 0,
                message: `privilege with level ${fkLevelPrivilege} not found`
            })
        }

        try{
            const user = await Users.create({username,password,fk_id_privilege: fkLevelPrivilege})

            const token = generateToken({id: user.id_user})

            return res.status(200).send({
                status: 1,
                message: 'user registered',
                user,token
            })
        }catch(err){
            res.status(500).json({error: 'create user failed! \nERR: '+err})
        }
    },
    async update(req,res){
        try{

            const {id} = req.params
            const {username,password,fkLevelPrivilege} = req.body
            
            const user = await Users.findByPk(id)
            if(!user){
                return res.status(404).send({message: 'user not found to update'})
            }
            await user.update({username,password,fkLevelPrivilege})
            return res.status(200).send({message: 'user updated succesfully'})
        }catch(err){
            return res.status(500).send({
                message: 'error when updating user: ',
                error: err,
            })
        }
    },
    async delete(req,res){
        try{
            const {id} = req.params
            const user = await Users.findByPk(id)
            if(!user){
                return res.status(404).send({message: 'user not found to delete'})
            }
            await user.destroy()
        }catch(err){
            return res.status(500).send({
                message: 'error when deleting user: ',
                error: err,
            })
        }

    }
}