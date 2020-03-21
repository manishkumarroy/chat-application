import React from "react";
import { connect } from "react-redux";
import { setFastMessages } from "../../actions/messageAction";
import io from 'socket.io-client'
import { useEffect } from "react";

const socket = io.connect("http://localhost:5000");

const sendMessage = (props) => {
    const msgDetails = {
        message: document.querySelector(".msgInput").value,

        reciever: props.reciever.email

    };
    socket.emit("privateMessage", msgDetails);
    props.setFastMessages(msgDetails);




};

function SendMessageInput(props) {

    useEffect(() => {
        socket.emit("newUser", props.user)
        socket.on("privateMessageBackend", (msgDetails) => {
            console.log(msgDetails)
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
