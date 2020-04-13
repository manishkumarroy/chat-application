export const changeChatScreen = (chatScreenChanger) => dispatch => {

    return dispatch({
        payload: chatScreenChanger.value,
        type: chatScreenChanger.type


    })
}