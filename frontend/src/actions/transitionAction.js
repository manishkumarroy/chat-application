export const changeChatScreen = (chatScreenChanger) => dispatch => dispatch({
    payload: chatScreenChanger.value,
    type: chatScreenChanger.type


})