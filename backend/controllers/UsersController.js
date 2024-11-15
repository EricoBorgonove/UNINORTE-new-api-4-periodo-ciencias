const {users} = require ('../models')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = class UsersController{
    static async showAll(req, res){
        const usuarios = await users.findAll()
        res.send(usuarios)
    }
    static async showOne(req, res){
        const user = await users.findByPk(req.params.id)
        res.send(user)
    }
    static async create(req, res){
        const user = await users.create({
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password
        })
        console.log (req.body)
        res.send(user)
    }
    static async update (req, res){
        const user = await users.findByPk(req.params.id)
        const result = await users.update(
            {
                nome: req.body.nome,
                email: req.body.email,
                password: req.body.password
            },
            {
                where: { id: req.params.id } 
                
            }
        );
        res.send(result)
    }
    static async delete(req, res){
        try{
            const user = await users.findByPk(req.params.id)
            await user.destroy()
            res.send(true)
        }catch(e){
            res.status(500).json({
                error: e.message
            }) 
        }

    }
    static async store (req, res){
        try{
            const salt = await bcrypt.genSalt(12)
            const senha = await bcrypt.hash(req.body.password, salt)
            const user = await users.create({
                nome: req.body.nome,
                email: req.body.email,
                password: senha
            })
            console.log (req.body)
            res.send(user)
        }catch(e){
            res.status(500).json({
                error: e.message
            })
        }

    }
    static async login (req, res){
        try{
            const user = await users.findOne({
                where:{
                    email: req.body.email
                }
            }) 
        
            if (user){
                const senhaCorreta = await bcrypt.compare(req.body.password, user.password)
                if (senhaCorreta){
                    const token = await jwt.sign(user.id, process.env.JWT_KEY)

                    res.json({
                        token: token,
                        id: user.id
                    })
                }else{
                    res.status(401).json({
                        error: 'Usuário ou Senha Inválida'
                    })                    
                }
            }else{
                res.status(401).json({
                    error: 'Usuário ou Senha Inválida'
                })
            }

        }catch(e){
            res.status(500).json({
                error: e.message
            })
        }
    }
}