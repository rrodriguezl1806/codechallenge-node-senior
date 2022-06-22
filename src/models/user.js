const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AddressSchema = require('./address')

const UserSchema = Schema({
    // id: Number,
    name: String,
    email: { type: String, unique: true, lowercase: true},
    birthDate: String,
    address: AddressSchema
})

module.exports = mongoose.model('user', UserSchema)