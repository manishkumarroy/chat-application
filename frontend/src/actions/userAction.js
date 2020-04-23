export const setUserDetails = (userDetails) => dispatch => {

    if (localStorage.getItem('user'))
        localStorage.removeItem('user')

    localStorage.setItem("user", JSON.stringify(userDetails.user))
    return dispatch({
        type: "setUserDetails",
        payload: userDetails
    })
}


export const setFriendList = (friendList) => dispatch => {
    return dispatch({
        type: "setFriendList",
        payload: friendList
    })
}

export const setChatList = (chatList) => dispatch => {
    return ({
        type: "setChatList",
        payload: chatList
    })
}


export const setNewNotificationsCount = (count) => dispatch => {
    return dispatch({
        type: "setNewNotificationsCount",
        payload: count
    })
}