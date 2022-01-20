const { Schema, model } = require('mongoose')
// const bcrypt = require('bcrypt')
const bcrypt = require('bcryptjs')

const Joi = require('joi')

const schema = new Schema({
    username: {
        type: String,
        require: true,
        validate: {
            validator: (username) => {
                return !Joi.string().email().validate(username).error;
            },
            msg: "Invalid email format"
        }
    },
    password: {
        type: String,
        require: true
    }
})

schema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 10)
}

schema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = model('User', schema);
