const mongoose = require("mongoose")
require("./modals/user")
const User = mongoose.model('user')
const socktetBackend = (server) => {
    const socket = require("socket.io")


    const io = socket(server)



    //Setting up first connection
    io.sockets.on('connection', (socket) => {

        console.log("socket connected")

        socket.on("newUser", async (user) => {
            console.log("new User")
            try {

                await User.findOne({ email: user.email }).updateOne({ socketId: socket.id, online: true })

                // const updatedUser = await User.findOne({ email: user.email })


                // socket.emit("newUser", updatedUser)

            }


            catch (err) { console.log(err) }



        })

        socket.on("privateMessage", async (msgDetails) => {
            console.log(msgDetails)
            try {
                const privateUser = await User.findOne({ email: msgDetails.reciever })

                if (privateUser.socketId)
                    io.to(privateUser.socketId).emit("privateMessageBackend", msgDetails)

                else {
                    User.recieveQueueMessages.updateMany()
                }





            }
            catch (err) {
                console.log(err)
            }


        })







    })


}

module.exports = socktetBackend

