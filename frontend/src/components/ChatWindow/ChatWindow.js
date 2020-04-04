import React from 'react'
import SideBar from '../SideBar/SideBar'
import OnlineChatScreen from '../ChatScreen/OnlineChatScreen'
import io from 'socket.io-client'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setPrivateMessageResponse } from '../../actions/messageAction'

export const socket = io.connect("http://localhost:5000");



function ChatWindow(props) {
    console.log(props.user)

    useEffect(() => {
        socket.emit("newUser", props.user)
        window.onclose = () => {
            console.log("dissconnected....")
            socket.emit("disconnect", "user dscnt")
        }
        socket.on("privateMessageResponse", (msgDetails) => {
            props.setPrivateMessageResponse(msgDetails)
        })

    }, [props.user])


    return (
        <div className="chatWindow">
            <SideBar />
            <OnlineChatScreen />


        </div>



    )

}

const mapStateToProps = (state) => {
    console.log(state)
    return { user: state.user.userDetails }

}

export default connect(mapStateToProps, { setPrivateMessageResponse })(ChatWindow);

