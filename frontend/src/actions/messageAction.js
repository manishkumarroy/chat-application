
export const setFastMessages = (message, initial) => dispatch => {
    return dispatch({
        type: initial ? "setInitialFastMessages" : "setFastMessages",
        payload: message
    })
}


export const setPrivateMessageResponse = (message) => dispatch => {
    return dispatch({
        type: "setPrivateMessageResponse",
        payload: message
    })
}

export const setOldMessages = (oldMessages) => dispatch => {
    return dispatch({
        type: "setOldMessages",
        payload: oldMessages
    })
}