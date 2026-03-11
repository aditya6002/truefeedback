import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    sender:mongoose.Types.ObjectId,
    recipient:mongoose.Types.ObjectId,
    content:string,
    createdAt:Date,
    updatedAt:Date
}

const MessageSchema:Schema = new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    recipient:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true});

const MessageModel = 
    (mongoose.models.Message as mongoose.Model<Message>) ||
    (mongoose.model<Message>('Message',MessageSchema))

export default MessageModel;