"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */


const User = require('../models/user')
const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')
const { model } = require('mongoose')


module.exports={


    login:async(req,res,next)=>{


        const {username,email,password} = req.body

        if((username || email) && password){

            const user =await User.findOne({$or:[{username},{email}]})

            if(user && user.password == passwordEncrypt(password)){

                if(user.is_active){
                    let tokenData = await Token.findOne({user_id:user._id})
                    if(!tokenData) tokenData = await Token.create({
                        user_id:user_id,
                        token:passwordEncrypt(user._id + Date.now())
                    })


                    res.send({
                        key:tokenData.token,
                        user
                    })
                }
                else{
                    res.errorStatusCode = 401
                    throw new Error('The user is not active')
                }
            }
            else{
                res.errorStatusCode = 401
                throw new Error('Wrong username/email and password')
            }
        }
        else{
            res.errorStatusCode = 401
            throw new Error('Please enter username/email and password')
        }

    },


    logout:(req,resinext)=>{

    },


}












