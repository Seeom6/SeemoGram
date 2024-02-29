import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    userImage:{
        type: String,
        default : 'userImage-1704871452248.jpeg'
    },
    role:{
        type : String,
        enum : [ "user" , "admin"],
        default : "user"
    },
    desc:{
        type: String,
        default: ''
    },
    followers:{
        type: [String],
        default: [],
    },
    following:{
        type: [String],
        default: []
    }
},{timestamps: true})


userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt)
})


userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

const userModel = mongoose.model("Users" , userSchema)


export default userModel;