import React from 'react'
import SideBar from '../SideBar/SideBar'
import OnlineChatScreen from '../ChatScreen/OnlineChatScreen'


export default function ChatWindow(props) {


    return (
        <div className="chatWindow">
            <SideBar />
            <OnlineChatScreen />


        </div>


    )
}

