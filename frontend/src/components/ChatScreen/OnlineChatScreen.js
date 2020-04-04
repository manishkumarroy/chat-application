import React from 'react'
import SendMessageInput from './SendMessageInput'
import UserProfile from './UserProfile'
import MessageScreen from './MessageScreen'
import TopBar from './TopBar'
import { connect } from 'react-redux'
import axios from 'axios'
import { backendURL } from '../../config'

function OnlineChatScreen(props) {





    if (props.screenView.type === "messageView")

        return <div className="onlineChatScreen clearfix">
            <TopBar user={props.screenView.user.userDeatails} />
            <MessageScreen className="sc" />
            <SendMessageInput />

            {window.scrollTo(0, window.scrollHeight)}

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