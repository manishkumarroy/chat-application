const initialState = {
    userDetails: {},
    chatList: [],
    friendList: [],
    newNotificationsCount: ""
}

export default (state = initialState, action) => {

    switch (action.type) {

        case "setUserDetails": return { ...state, userDetails: { ...action.payload.user } }

        case "setFriendList": return { ...state, friendList: action.payload }

        case "setChatList": return { ...state, chatList: action.payload }

        case "setNewNotificationsCount": return { ...state, newNotificationsCount: action.payload }

        default: return state

    }
}