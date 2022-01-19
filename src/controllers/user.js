const User = require('../models/user')
const { validateToken, generateToken } = require('../utils/jwt')
const bcrypt = require('bcrypt')
const Joi = require('joi')

async function registerUser(req, res) {
    // const { username, password } = req.body
    // const reg = new RegExp(/^\S+@\S+\.\S+$/).test(username)
    // if (!reg) return res.sendStatus(403)

    const schema = Joi.object({
        username: Joi.string().regex(/^\S+@\S+\.\S+$/).required(),
        password: Joi.string().required()
    });
    const { username, password } = await schema.validateAsync(req.body, {
        allowUnknown: true,
        stripUnknown: true
    })

    const existingUser = await User.findOne({ username })

    if (existingUser) {
        return res.status(409).json({ error: "this user exists already" })
    }

    const user = new User({
        username,
        password
    })

    await user.hashPassword()
    try {
        await user.save()
    } catch (e) {
        return res.status(400).json({ error: "error in saving user data" })
    }


    return res.sendStatus(201)
}

async function loginUser(req, res) {
    const { username, password } = req.body
    const existingUser = await User.findOne({ username })
    if (!existingUser) {
        return res.status(403).json({ error: 'this account is not exist' })
    }

    const status = await existingUser.validatePassword(password)

    if (!status) return res.status(403).json({ error: 'wrong password or username' })
    const token = generateToken({ id: existingUser._id })

    return res.status(201).json({ token, username })
}

async function modifyPasswordUser(req, res) {
    const { id } = req.params
    const { password1, password2 } = req.body
    console.log(id);
    const existingUser = await User.findOne({ _id: id })
    if (!existingUser) {
        return res.sendStatus(403)
    }

    if (password1 !== password2) {
        return res.sendStatus(403)
    }

    if (await existingUser.validatePassword(password1)) {
        return res.status(403).json({ error: 'password should be different with the old one' })
    }
    const password = await bcrypt.hash(password1, 10)
    const modifiedUser = await User.findByIdAndUpdate(id, { password })

    return res.send(modifiedUser)
}

module.exports = {
    registerUser,
    loginUser,
    modifyPasswordUser
}