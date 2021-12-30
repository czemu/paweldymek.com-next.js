const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOCALE':
            return {
                ...state,
                locale: action.payload
            }
        default:
            return state
    }
}

export default Reducer