import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{       // Here we define the type of message
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({         // Here we define the model of message
    content: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{              // Here we define the type of user
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean,
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({         // Here we define the model of user
    username: {
        type: String, 
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String, 
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;