const express = require("express");
const UserRouter = express.Router()
const User = require("../modals/user")


UserRouter.get("/user-by-id/:id", async (req, res) => {
    res.status(200).json(await User.findById(req.params.id))
})


UserRouter.get("/name/:name", async (req, res) => {
    console.log(req.params)
    try {
        let value = new RegExp(req.params.name, 'i')

        const users = await User.find({ name: value }).select(["name", "email", "_id"])
        console.log(users)
        res.status(200).json(users)

    }

    catch (err) {
        res.status(404).json({ err: "No User Or Server Error" })
    }




})

UserRouter.post("/register", async (req, res) => {
    const user = req.body
    newUser = {

        name: user.name,
        email: user.email,
        password: user.password,
        cpassword: user.cpassword,
        joinedDate: Date.now(),
        fastMessages: []


    }
    try {
        await new User(newUser).save()

        let msg = { type: "success", data: "User Registered Succesfully" }

        res.status(200).json(msg)
    }

    catch (err) {
        console.log("Error of mongoDB ", err)

        res.status(400).json({ type: "fail", data: "Some server error may be user already exists" })

    }

})

UserRouter.post("/login", async (req, res) => {

    const username = req.body.email
    const password = req.body.password
    console.log(req.body)

    try {
        let user = await User.findOne({ email: username }).select(["_id", "name", "email", "password"])

        if (user) {
            if (user.password === password)
                res.status(200).json({ user })
            else
                res.status(400).json({ msgError: "Password Incorrect" })
        }



        else

            res.status(400).json({ msgError: "User Not Exists" })

    }

    catch (err) {
        console.log("Error of mongoDB ", err)

        res.status(400).json({ msgError: "User Not Exists" })

    }


})



UserRouter.get("/online", async (req, res) => {
    try {
        const connectedUsers = await User.find({ online: true })
        if (connectedUsers)
            res.status(200).json(connectedUsers)
    }
    catch (err) {
        res.status(400).json(err)
    }
})

UserRouter.get("/messages/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (user)
            res.status(200).json(user.fastMessages)
    }
    catch (err) {
        res.status(400).json(err)
    }
})




UserRouter.get("/friends/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.find({ _id: userId })
        if (user.length) {

            let friends = user[0].friendList.filter(user => user.stage === "accepted")
            res.status(200).json(friends)
        }

        else
            res.status(200).json([])


    }
    catch (err) {
        res.status(400).json(err)
    }
})


// UserRouter.post("/addFriend", async (req, res) => {
//     const friendId = req.body.friendId;
//     const senderId = req.body.senderId;



//     console.log(req.body.senderId)
//     console.log(req.body)


//     try {
//         await User.findByIdAndUpdate(senderId, {
//             $push: { friendList: { friend_id: friendId, name: req.body.friendName, status: false, sender: true, stage: 'sent', email: req.body.friendEmail, new: true } },

//         })

//         await User.findByIdAndUpdate(friendId, {
//             $push: { friendList: { friend_id: senderId, name: req.body.senderName, status: false, sender: false, stage: 'recieved', email: req.body.senderEmail, new: true } },

//         })

//     }
//     catch (err) {
//         console.log(err)
//     }
// })

async function removeFriend(senderId, recieverId) {
    console.log("deleting")


    try {
        await User.findByIdAndUpdate(senderId, {
            $pull: { friendList: { $eleMatch: { friend_id: recieverId } } }
        })
    }
    catch (err) {
        console.log(err)
    }

}

UserRouter.post("/responseFriendRequest", async (req, res) => {
    const friendId = req.body.friendId;
    const senderId = req.body.senderId;
    const senderName = req.body.senderName
    const friendName = req.body.friendName
    const response = req.body.response


    console.log(req.body.senderId)
    console.log(friendId)

    if (response === true) {
        try {
            await User.updateOne({ _id: senderId }, {
                $set: { "friendList.$[friend].stage": "accepted", "friendList.$[friend].new": true }, $push: { "fastMessages": { recieverId: friendId, name: friendName, messages: [] } }
            }
                , {
                    arrayFilters: [{ "friend.friend_id": friendId }]
                })


            await User.updateOne({ _id: friendId }, {
                $set: { "friendList.$[friend].stage": "accepted" },
                $push: { "fastMessages": { recieverId: senderId, name: senderName, message: [] } }
            }
                , {
                    arrayFilters: [{ "friend.friend_id": senderId }]
                })




        }
        catch (err) {
            console.log(err)
        }
    }
    else {
        removeFriend(friendId, senderId)
        removeFriend(senderId, friendId)
    }

    res.sendStatus(200);

})

UserRouter.get("/friendRequests/:id", async (req, res) => {
    try {
        const friendList = await User.findById({ _id: req.params.id }).select(["friendList"])
        res.status(200).json(friendList)
    }

    catch (err) {

        res.status(400).json("Server Error")
    }
})


UserRouter.get("/newFriendRequests/:id", async (req, res) => {
    try {
        const friendListInfo = await User.findById({ _id: req.params.id }).select(["friendList"])
        const newFriendRequets = Array.from(friendListInfo.friendList).filter(request => request.new === true)

        res.status(200).json(newFriendRequets.length)
    }

    catch (err) {

        res.status(400).json("Server Error")
    }
})

UserRouter.get("/notifications/seen/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $set: {
                "friendList.$[friend].new": false
            },
        }, {
            arrayFilters: [{ "friend.new": true }]
        })



        res.status(200).json("notifications updated 0")
    }
    catch (err) {
        console.log(err)
        res.json(err)
    }
})

UserRouter.get("/friendCheck/:senderId/:recieverId", async (req, res) => {

    console.log(req.params)
    try {
        const friendListInfo = await User.findById(req.params.senderId).select(["friendList"])

        const friend = Array.from(friendListInfo.friendList.filter(user => user.friend_id == req.params.recieverId))
        console.log(friend)
        friend.length ? friend[0].stage === "accepted" ? res.status(200).json("friends") : res.status(200).json("friendRequestSent") : res.status(200).json("noFriends")
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

})

module.exports = UserRouter