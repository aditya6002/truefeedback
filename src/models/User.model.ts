import mongoose, {Schema,Document} from 'mongoose';


export interface User extends Document {
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpire:Date,
    isVerified:boolean,
    isAcceptingMessages:boolean,
    createdAt:Date,
    updatedAt:Date
}

const UserSchema:Schema = new Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        trim:true
    },
    verifyCode:{
        type:String,
        required:[true,'Verify code is required'],
        trim:true
    },
    verifyCodeExpire:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true
    },
    Messages:[
        {
            type:Schema.Types.ObjectId,
            ref:'Message'
        }
    ]
},{timestamps:true});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User',UserSchema))

export default UserModel;


