const mongoose = require("mongoose")
require("./modals/user")
const User = mongoose.model('user')
const socktetBackend = (server) => {
    const socket = require("socket.io")


    const io = socket(server)

    const updateMessageOffline = async (senderId, recieverId, msgDetails) => {

        let sender = false;
        let status = "present"

        await User.updateOne({ _id: recieverId }, {

            $push: {
                "offlineMessages": {
                    senderId: senderId,
                    sentTime: msgDetails.sentTime,
                    messageText: msgDetails.messageText,
                    sender: sender,
                    status: status



                }, upsert: true
            }
        })

    }

    const updateMessage = async (senderId, recieverId, msgDetails, acknowledge, socketId) => {
        let sender = false;
        let status = null
        if (senderId === msgDetails.senderId)
            sender = true;
        if (msgDetails.status)
            status = msgDetails.status

        await User.updateOne({ _id: senderId }, {

            $push: {
                "fastMessages.$[reciever].messages": {
                    sentTime: msgDetails.sentTime,
                    messageText: msgDetails.messageText,
                    sender: sender,
                    status: status



                }
            }
        }, {
            "arrayFilters": [{ "reciever.recieverId": recieverId }]
        })


        if (acknowledge) {
            console.log(socketId)
            console.log(msgDetails)

            io.to(socketId).emit("privateMessageResponse", msgDetails)

        }
        else {
            console.log("wyb")
            io.to(socketId).emit("privateMessageBackend", msgDetails)

        }

    }



    //Setting up first connection
    io.sockets.on('connection', (socket) => {

        console.log("socket connected")

        socket.on("newUser", async (user) => {
            console.log("new User", socket.id)
            try {

                await User.findOne({ email: user.email })
                    .updateOne({ socketId: socket.id, online: true })

                // updateMessagesOfflineFrontendReciever();
                // pushOfflineMessagesToMessagesReciever();
                // updateSenderAcknowledgement();


            }


            catch (err) { console.log(err) }



        })

        socket.on("disconnect", async (msg) => {

            await User.updateOne({
                socketId: socket.id
            }, { socketId: "0" })
        })

        socket.on("privateMessage", async (msgDetails) => {
            console.log(msgDetails)
            try {
                const privateUser = await User.findOne({ _id: msgDetails.recieverId })

                const sender = await User.findOne({ _id: msgDetails.senderId })

                if (privateUser.socketId != 0) {
                    msgDetails.status = "received"
                    updateMessage(msgDetails.recieverId, msgDetails.senderId, msgDetails, 0, privateUser.socketId)

                    msgDetails.status = "delivered"

                    updateMessage(msgDetails.senderId, msgDetails.recieverId, msgDetails, 1, sender.socketId)

                }

                else {
                    msgDetails.status = "present"

                    updateMessageOffline(msgDetails.senderId, msgDetails.recieverId, msgDetails)

                    msgDetails.status = "sent"

                    updateMessage(msgDetails.senderId, msgDetails.recieverId, msgDetails, 1, sender.socketId)

                }





            }
            catch (err) {
                console.log(err)
            }


        })







    })





}

module.exports = socktetBackend

