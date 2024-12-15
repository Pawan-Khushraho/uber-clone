import mongoose, {Model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

type TuserSchema = {
    fullname: {
        firstName: string;
        lastName?: string;
    } ;
    email:string;
    password:string;
    socketId?:string;
    hashPassword: () => Promise<void>;
    generateAuthToken: () => Promise<void>;
}

const userSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters long"],
        },
        lastName: {
            type: String,
            minLength: [3, "Last name must be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email must be at least 5 characters long"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
        unique: true,
    }
})

userSchema.methods.generateAuthToken = function ():string {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret is not defined');
    }
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}
userSchema.methods.comparePassword = async function (password:string):Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.hashPassword = async function(password:string):Promise<string> {
    return await bcrypt.hash(password,10);
}

const userModel:Model<TuserSchema>  =  mongoose.model<TuserSchema>('user',userSchema);

export default userModel;