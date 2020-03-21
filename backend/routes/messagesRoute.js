const express = require("express");
const MessagesUserRouter = express.Router()
const mongoose = require("mongoose")

require("../modals/user")

const MessagesUser = mongoose.model('user')
MessagesUserRouter.post("/", (req, res) => {
    const message = req.body.message,
    const senderId = req.body.senderId,
    const receiverId = req.body.receiverId

    MessagesUser.updateOne({
        _id: senderId,
        fastMessages: { $elemMatch: { recieverID: receiverId } }
    }, {
        $push: { "fastMessages.$.message": message }
    });


})

