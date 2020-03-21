
export const setFastMessages = (message) => dispatch => {
    return dispatch({
        type: "setFastMessages",
        payload: message
    })
}


export const setOldMessages = (oldMessages) => dispatch => {
    return ({
        type: "setOldMessages",
        payload: oldMessages
    })
}