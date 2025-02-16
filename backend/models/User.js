import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
},{
 timestamps: true
});

//Hash password before saving
userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

//method to compare passwrods
userSchema.methods.comparePassword = async function (enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User',userSchema);

export default User;