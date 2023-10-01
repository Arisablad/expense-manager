import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bankAccounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount',
        default: []
    }]
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

export default User