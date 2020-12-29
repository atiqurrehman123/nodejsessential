import mongoose from 'mongoose'
import  bcrypt  from 'bcrypt'
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default:Date.now()
    }
})
// becryption of password 
UserSchema.methods.camparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
    
}
// use for encrypted message
// npm i bcrypt jsonwebtoken 