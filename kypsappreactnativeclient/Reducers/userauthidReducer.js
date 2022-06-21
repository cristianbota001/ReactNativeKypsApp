const userauthidReducer = (state = null, action) => {
    switch(action.type){
        case "setUserAuthID": return action.value
        default: return state;
    }
}

export default userauthidReducer;