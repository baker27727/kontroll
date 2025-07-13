import * as mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    user_identifier:{
        type: String,
        unique: true,
        required: [true, 'please enter user identifier']
    },

    name:{
        type: String,
        required: [true, 'please enter name']
    },

    created_at:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: [true, 'please enter a password']
    }
})

const UserModel = mongoose.model('User',UserSchema)

export default UserModel