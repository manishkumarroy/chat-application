import React from "react";
import { connect } from "react-redux";
import { setFastMessages } from "../../actions/messageAction";

import { useEffect } from "react";

import { socket } from "../ChatWindow/ChatWindow"

const sendMessage = (props) => {
    let msgDetails = {
        messageText: document.querySelector(".msgInput").value,

        recieverId: props.reciever.friend_id,
        senderId: props.user._id,
        sentTime: new Date().toLocaleTimeString()

    };


    socket.emit("privateMessage", msgDetails);

    props.setFastMessages(msgDetails);




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

            <i className="material-icons">images</i>

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
    user: state.user.userDetails
})
export default connect(mapStateToProps, { setFastMessages })(SendMessageInput);
