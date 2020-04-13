const express = require("express");
const MessagesUserRouter = express.Router();
const mongoose = require("mongoose")


require("../modals/user")
const User = mongoose.model('user')

MessagesUserRouter.get("/offlineMessages/:id", async (req, res) => {
    try {


        const id = req.params.id;
        let offlineMessages = await User.find({ _id: id }).select(["offlineMessages"])
        console.log("ll")
        res.status(200).json(offlineMessages)
    }
    catch (err) {
        res.status(400).json("error")
    }
})
MessagesUserRouter.get("/chats/:id", async (req, res) => {
    try {


        const id = req.params.id;
        let chats = await User.find({ _id: id }).select(["chats"])
        console.log("ll")
        res.status(200).json(chats)
    }
    catch (err) {
        res.status(400).json("error")
    }



})


MessagesUserRouter.post("/chats/:id", async (req, res) => {
    try {


        const id = req.params.id;
        const chat = req.body
        console.log(req.body)
        let chats = await User.updateOne({ _id: id }, {
            $push: {
                chats: chat
            }
        })
        console.log("updating Chat...")
        res.status(200).json("Updated")
    }
    catch (err) {
        console.log(err)
        res.status(400).json("failed")
    }



})


module.exports = MessagesUserRouter

