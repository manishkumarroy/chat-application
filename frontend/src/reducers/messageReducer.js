const initialState = {
    fastMessages: [],
    oldMessages: [],
    messageCount: 0

}

export default (state = initialState, action) => {
    switch (action.type) {
        case "setFastMessages":
            let found = false;
            let tempFastMessages = state.fastMessages

            tempFastMessages.forEach((msgInfo) => {
                if (msgInfo.recieverId === action.payload.recieverId || msgInfo.recieverId === action.payload.senderId) {
                    found = true
                    msgInfo.messages.push(action.payload)

                }
            })

            if (!found) {
                console.log("----")
                return ({ ...state, fastMessages: [...state.fastMessages, { recieverId: action.payload.recieverId, messages: [action.payload] }] })
            }
            else

                return { ...state, fastMessages: [...state.fastMessages], messageCount: state.messageCount + 1 }

        case "setInitialFastMessages": return { ...state, fastMessages: action.payload }

        case "setPrivateMessageResponse":
            state.fastMessages.forEach((msgInfo) => {
                msgInfo.messages.forEach((msg, index) => {

                    if (msg.messageText === action.payload.messageText) {
                        console.log(msg, action.payload)
                        msgInfo.messages[index] = action.payload
                        console.log(msgInfo.messages)
                    }

                })

            })

            return { ...state, fastMessages: [...state.fastMessages], messageCount: state.messageCount + 1 }

        case "setOldMessages": return { ...state, OldMessages: action.payload }
        default: return state;
    }

}