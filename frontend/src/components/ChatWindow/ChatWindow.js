import React from 'react'
import SideBar from '../SideBar/SideBar'
import OnlineChatScreen from '../ChatScreen/OnlineChatScreen'
import io from 'socket.io-client'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setPrivateMessageResponse, setInitialChats } from '../../actions/messageAction'
import { setNewNotificationsCount } from '../../actions/userAction'

import axios from 'axios'
import { backendURL } from '../../config'

export const socket = io.connect("http://localhost:5000");



function ChatWindow(props) {
    console.log(props.user)
    const user = props.user

    useEffect(() => {

        window.onclose = () => {
            console.log("dissconnected....")
            socket.emit("disconnect", "user dscnt")
        }
        socket.on("privateMessageResponse", (msgDetails) => {
            console.log(msgDetails)
            props.setPrivateMessageResponse(msgDetails)
        })


    }, [])

    useEffect(() => {
        socket.emit("newUser", props.user)
        window.onclose = () => {
            console.log("dissconnected....")
            socket.emit("disconnect", "user dscnt")
        }
        if (user._id) {

            console.log("offline Messages")
            axios.get(`${backendURL}/messages/offlineMessages/${user._id}`).then((response) => {
                console.log(response.data[0])
            })

            axios.get(`${backendURL}/messages/chats/${user._id}`).then((response) => {
                console.log("chatsd..", response.data[0])

                props.setInitialChats(response.data[0].chats)



            })

            axios.get(`${backendURL}/user/newFriendRequests/${user._id}`).then(response => props.setNewNotificationsCount(response.data))


        }


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
    return { user: state.user.userDetails, chats: state.messageDetails.chats }

}

export default connect(mapStateToProps, { setPrivateMessageResponse, setInitialChats, setNewNotificationsCount })(ChatWindow)

