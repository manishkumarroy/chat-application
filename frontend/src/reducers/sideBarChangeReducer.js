
const initalState = {
    noChats: true,
    noFriends: true,
    contentViewer: 'showMessages',
    moreFriends: 1,
    moreChats: 1,
    morePeople: 1,
    searchView: false,
    searchUsers: []



}
const chatScreenChanger = (state = initalState, action) => {
    switch (action.type) {

        case 'contentViewChange': return { ...state, contentViewer: action.payload }

        case 'searchViewChange': return { ...state, searchView: action.payload }


        case 'chatsEnable': return { ...state, contentViewer: action.payload }

        case 'friendsEnable': return { ...state, contentViewer: action.payload }

        case 'setSerachUsers': return { ...state, contentViewer: 'showUsers', searchUsers: action.payload }



        default: return state
    }

}
export default chatScreenChanger