const express = require('express')
const UserModel = require('../models/UserModels')

const routes = express.Router()

//http://localhost:3032/api/v1/user/signup
routes.post('/signup', async (req, res) => {
    try{
        const newUser = new UserModel({
            ...req.body
        })
        await newUser.save()
        console.log("New User created: " + newUser)
        res.status(201).send(newUser)
    }catch(error){
        res.status(500).send(error)
    }
})


//Allows user to access system
//http://localhost:3032/api/v1/user/login
routes.post('/login', async (req, res) => {
    const {username, password} = req.query

    try{
        const user = await UserModel.findOne({ $or: [{ username: username }, { email: username }] })
        if(user){
            if(password == user.password){
                console.log("User logged in: " + user)
                res.send({
                    username: username,
                    password: password
                })
            }else{
                res.send({
                    status: false,
                    message: 'Invalid Username and/or password'
                })
            }
        }else{
            res.send({
                status: false,
                message: 'Invalid Username and/or password'
            })
        }

    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = routes