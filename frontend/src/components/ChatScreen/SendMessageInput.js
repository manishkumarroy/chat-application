import React from "react";
import { connect } from "react-redux";
import { setFastMessages } from "../../actions/messageAction";

import { useEffect } from "react";

import { socket } from "../ChatWindow/ChatWindow"
import { setChats } from '../../actions/messageAction'
import axios from "axios";
import { backendURL } from "../../config";

const sendMessage = (props) => {

    let msgDetails = {
        messageText: document.querySelector(".msgInput").value,

        recieverId: props.reciever.friend_id,
        senderId: props.user._id,
        sentTime: new Date().toLocaleTimeString(),
        status: "waiting"

    };

    socket.emit("privateMessage", msgDetails);

    props.setFastMessages(msgDetails);


    const chats = props.chats

    let notFound = true;
    chats.forEach((chat, index) => {
        if (chat)
            if (chat.userId === msgDetails.recieverId) {
                notFound = false;
                console.log("popo")
                chats.splice(index, 1)
                console.log(chats)
                chat.lastMessage = msgDetails.messageText
                chat.sentTime = msgDetails.sentTime
                chats.push(chat)
                console.log(chats)
                axios.post(`${backendURL}/messages/chats/${msgDetails.senderId}`, JSON.stringify(chat))
                props.setChats(chats)
            }
    })
    if (notFound) {
        let newChat = {
            userId: msgDetails.recieverId,
            name: "Naman",
            lastMessage: msgDetails.messageText,
            sentTime: msgDetails.sentTime
        }

        chats.push(newChat)
        console.log(chats)
        axios.post(`${backendURL}/messages/chats/${msgDetails.senderId}`, newChat).then(() => { props.setChats(chats) })

    }


};

function SendMessageInput(props) {

    useEffect(() => {

        socket.on("privateMessageBackend", (msgDetails) => {
            console.log(msgDetails, "hua")
            props.setFastMessages(msgDetails);
        })

    }, [])

    return (
        <div className="sendMessageInput  p-3 rounded">
            <i className="material-icons">emoji_emotions</i>
            <i className="material-icons">gradient</i>
            <i className="material-icons" onClick={() => {
                document.querySelector(".file-input").click()
            }}>images</i>
            <label>
                <input type="file" name="img-message" id="" className="d-none file-input" onChange={(e) => {
                    Array.from(e.target.files).forEach(async (file, i) => {
                        console.log("imsge---")
                        props.setFastMessages({
                            imageText: URL.createObjectURL(file),

                            recieverId: props.reciever.friend_id,
                            senderId: props.user._id,
                            sentTime: new Date().toLocaleTimeString(),
                            status: "waiting"


                        })

                        let formData = new FormData();

                        formData.set("file-message", file)
                        console.log(e.target.files, formData)
                        try {
                            const response = await axios({
                                method: "post",
                                url: `${backendURL}/messages/message/img`,
                                headers: { 'Content-Type': 'multipart/form-data' },
                                data: formData,
                                onUploadProgress: (upload) => {
                                    console.log(upload.loaded + " ")
                                }
                            })
                            console.log(response)


                        } catch (err) {
                            console.log(err)
                        }

                    })


                }} />
            </label>


            <input
                type="text"
                className=" msgInput"
                placeholder="Type a message...."
            />
            <div className="send">
                <i
                    className="text-white material-icons mt-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => sendMessage(props)}
                >
                    send
        </i>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    reciever: state.chatScreenChanger.user.userDetails,
    user: state.user.userDetails,
    chats: state.messageDetails.chats
})
export default connect(mapStateToProps, { setFastMessages, setChats })(SendMessageInput);
