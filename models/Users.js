const { model, Schema} =require('mongoose')


const userSchema = new Schema({
    username: String,
    email: String,
    birthday: String, 
    age: Number
})

module.exports = model('users', userSchema)