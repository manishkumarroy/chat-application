const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    socketId: { type: String },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String },
    online: { type: Boolean, require: true, default: false },
    joinedDate: { type: Date, require: true },
    friendList: [
        {
            friend_id: { type: Schema.Types.ObjectId, ref: 'user' },

            name: { type: String, require: true },

            dpURL: { type: String },
            stage: { type: Boolean, required: true },
            sender: { type: Boolean, required: true },
            email:{type:String},
        }
    ],
    fastMessages: [{

        recieverId: { type: Schema.Types.ObjectId, ref: 'user' },
        name: { type: String },
       
        messages: [{
            deliveredTime: { type: Date },
            sentTime: { type: Date, require: true },
            receivedTime: { type: Date },
            messageText: { type: String, require: true }
        }]


    }]
})

mongoose.model('user', userSchema)