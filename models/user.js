import { Schema, model, models } from "mongoose";

const UserSchema= new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'UserName is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]

    },
    image: {
        type: String,
    }
});

//If we had been using express-> then mongo db server is always ON so we can directly write 'const User= model('User', UserSchema);'. But in nexts, we have to connect to db each time and so mongo db server is not always ON. So while connecting, we need to check if a model named User already exists. If it does, we need to connect to that, not create a new one. So we use 'const User= models.User || model('User', UserSchema);'.
const User= models.User || model('User', UserSchema);
export default User;