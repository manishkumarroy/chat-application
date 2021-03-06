import React, { useEffect } from 'react'
import SendMessageInput from './SendMessageInput'
import UserProfile from './UserProfile'
import MessageScreen from './MessageScreen'
import TopBar from './TopBar'
import { connect } from 'react-redux'


function OnlineChatScreen(props) {

    // useEffect(() => {
    //     if (props.screenView.type !== "default")
    //         document.querySelector(".sideBar").style.display = "none"

    // }, [props.screenView])





    if (props.screenView.type === "messageView")

        return <div className="onlineChatScreen clearfix">
            <TopBar user={props.screenView.user.userDeatails} />
            <MessageScreen />
            <SendMessageInput />



        </div>

    else
        return <div className="profileScreen">
            <UserProfile />

        </div>


}

const mapStateToProps = (state) => ({

    screenView: state.chatScreenChanger

})

export default connect(mapStateToProps, null)(OnlineChatScreen)