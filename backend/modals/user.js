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
            friend_id: { type: Schema.Types.ObjectId, ref: 'user', unique: true },

            name: { type: String, require: true, unique: true },
            new: { type: Boolean },
            dpURL: { type: String },
            stage: { type: String, required: true, default: "none" },
            sender: { type: Boolean, required: true },
            email: { type: String },
        }
    ],
    fastMessages: [{

        recieverId: { type: Schema.Types.ObjectId, ref: 'user' },
        name: { type: String },

        messages: [{

            deliveredTime: { type: Date },
            sentTime: { type: String, require: true },
            receivedTime: { type: Date },
            messageText: { type: String, require: true }, sender: { type: Boolean, require: true },
            status: { type: String, require: true },
            type: { type: String, default: 'text' }
        }],





    }],
    offlineMessages: [{
        senderId: { type: Schema.Types.ObjectId, ref: 'user' },
        sentTime: { type: String, require: true },
        messageText: { type: String, require: true }, sender: { type: Boolean, require: true },
        status: { type: String, require: true }
    }],

    chats: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "user" },
            name: { type: String, require: true },

            time: { type: String, require: true },

            type: { type: String, require: true, default: "text" },
            lastMessage: { type: String, require: true, default: "text" },
            status: { type: String, require: true, default: "waiting" }
        }
    ]
    ,
    notications: [{

        type: { type: String, require: true, default: "text" },

        content: { type: String, require: true },

        time: { type: Schema.Types.Date, require: true },
        offline: { type: Boolean, require: true }



    }]

})

const User = mongoose.model('user', userSchema)
module.exports = User
