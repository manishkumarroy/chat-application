const User = require("./modals/user")
const updateMessage = require("./socketBackend/helpers/helperMessages")

const socktetBackend = (server) => {
    const socket = require("socket.io")
    const io = socket(server)

    //Setting up first connection
    io.sockets.on('connection', (socket) => {
        console.log("socket backend connected")

        socket.on("newUser", async (user) => {
            console.log("new User", socket.id)
            try {

                await User.findOne({ email: user.email })
                    .updateOne({ socketId: socket.id, online: true })

            }
            catch (err) { console.log(err) }

        })

        socket.on("disconnect", async (msg) => {

            await User.updateOne({
                socketId: socket.id
            }, { socketId: 0 })
        })

        socket.on("privateMessage", async (msgDetails) => {
            console.log(msgDetails)
            try {
                const privateUser = await User.findOne({ _id: msgDetails.recieverId })

                const sender = await User.findOne({ _id: msgDetails.senderId })

                if (privateUser.socketId !== 0) {
                    msgDetails.status = "received"

                    updateMessage(msgDetails.recieverId, msgDetails.senderId, msgDetails, 0, privateUser.socketId, io)

                    msgDetails.status = "delivered"

                    updateMessage(msgDetails.senderId, msgDetails.recieverId, msgDetails, 1, sender.socketId, io)

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

        socket.on("newFriendRequest", async (details, cb) => {

            const { friendId, senderId } = details
            console.log(details, cb)


            try {

                const user = await User.findById(senderId)
                user.friendList.forEach(user => {
                    console.log(user)
                    if (user.friend_id == friendId)
                        throw new Error("user already exists")

                })
                const socketId = await User.findById(friendId).select(["socketId"])
                console.log(socketId.socketId)

                //if user is online
                if (socketId) {
                    io.to(socketId.socketId).emit("newFriendRequestFromBackend", { friend_id: senderId, name: details.senderName, sender: false, stage: 'recieved', email: details.senderEmail, new: true })


                }
                //set backend of friend
                await User.findByIdAndUpdate(friendId, {
                    $push: { friendList: { friend_id: senderId, name: details.senderName, sender: false, stage: 'recieved', email: details.senderEmail, new: true } },

                })
                console.log("here")
                cb({ friend_id: friendId, name: details.friendName, status: false, sender: true, stage: 'sent', email: details.friendEmail, new: true })

                await User.findByIdAndUpdate(senderId, {
                    $push: { friendList: { friend_id: friendId, name: details.friendName, status: false, sender: true, stage: 'sent', email: details.friendEmail, new: true } },

                })
            }
            catch (err) {
                console.log(err)

            }



        })


    })





}

module.exports = socktetBackend

