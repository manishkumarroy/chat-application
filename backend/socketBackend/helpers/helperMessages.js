const User = require("../../modals/user")
updateMessageOffline = async (senderId, recieverId, msgDetails) => {

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

const updateMessage = async (senderId, recieverId, msgDetails, acknowledge, socketId, io) => {
    console.log("object")
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
        io.to(socketId).emit("privateMessageResponse", msgDetails)

    }
    else {

        io.to(socketId).emit("privateMessageBackend", msgDetails)

    }

}

module.exports = { updateMessage: updateMessage, updateMessageOffline: updateMessageOffline }


