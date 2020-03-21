const initialState = {
    fastMessages: [],
    oldMessages: [],

}

export default (state = initialState, action) => {
    switch (action.type) {
        case "setFastMessages": return { ...state, fastMessages: [...state.fastMessages, action.payload] }

        case "setOldMessages": return { ...state, OldMessages: action.payload }
        default: return state;
    }

}