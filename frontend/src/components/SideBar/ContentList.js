import React from 'react'
import { changeChatScreen } from '../../actions/transitionAction'
import { connect } from 'react-redux'
import UsersList from './contents/UsersList'
import FriendList from './contents/FriendList'
import ChatList from './contents/ChatList'
import Notifications from './contents/Notifications'


function ContentList(props) {
    const contentViewer = props.contentViewer


    return (
        <div className="contentList">
            {contentViewer === "showMessages" ? <ChatList /> : contentViewer === "showFriends" ? <FriendList /> : contentViewer === "showNotifications" ? <Notifications /> : <UsersList />}




        </div>

    )
}

const mapStateToProps = (state) => ({
    contentViewer: state.sideBarChanger.contentViewer
})

export default connect(mapStateToProps, { changeChatScreen })(ContentList)
