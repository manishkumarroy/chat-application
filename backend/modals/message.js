const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    senderID: { type: Schema.ObjectId },
    recieverID: { type: Schema.ObjectId },
    deliveredTime: { type: Date },
    sentTime: { type: Date, require: true },
    receivedTime: { type: Date },
    messageText: { type: Text, require: true }
})

mongoose.model('message', messageSchema)