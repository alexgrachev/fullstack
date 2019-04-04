const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const keys = require('../config/mykeys')
const errorHandler = require('../utils/errorhandler')

module.exports.login = async function (req, res) {
    const candidate =  await User.findOne({email: req.body.email})

    if(candidate) {
        //find user
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            // generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600})

            res.status(200).json({
                token: `Bearer ${token}`,
                jwt: `${keys.jwt}`,
            })
        }else{
            //password not compare
            res.status(401).json({
                message: 'Login/Password incorrect',
            })
            console.log('Login/Password incorrect')

        }
    }else{
        // not found user
        res.status(404).json({
            message: 'User not found',
        })
        console.log('User not found ')

    }

}


module.exports.register = async function (req, res) {
    // email password
    const candidate =  await User.findOne({email: req.body.email})

    if(candidate){
        // user exsit need show eroor
        res.status(409).json({
            message: 'User exsit',
        })
        console.log('User exist ')
    } else {
        // need create user
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        })

        try {
            await user.save()
            res.status(201).json(user)
        }
        catch (e) {
    	    errorHandler(res, e)
            console.log('Erorr with create user')
        }

        
    }
}


