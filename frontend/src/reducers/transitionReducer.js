
const initalState = {
    type: 'default',
    user: { userDetails: null, userId: null }
}
const chatScreenChanger = (state = initalState, action) => {

    switch (action.type) {

        case 'friendProfileView': return { type: 'friendProfileView', user: action.payload }
        case 'messageView': return { type: 'messageView', user: action.payload }
        default: return state
    }

}
export default chatScreenChanger