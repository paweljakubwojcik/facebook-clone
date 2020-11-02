const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,  // required i s handled by GraphQL
    password: String,
    email: String,
    createdAt: String,
})

module.exports = model('User', userSchema)