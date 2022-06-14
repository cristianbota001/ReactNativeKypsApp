const credReducer = (state = [], action) => {
    switch(action.type){
        case "setCred": return [...state, action.value];
        case "resetCred": return [...action.value];
        case "spliceCred": {
            let lista = [...state];
            lista.splice(action.index, 1)
            return [...lista];
        }
        case "popCred": {
            let lista = [...state];
            lista.pop()
            return [...lista];
        }
        case "updateCred": {
            let lista = [...state];
            lista[action.index].service = action.service
            lista[action.index].username = action.username
            lista[action.index].password = action.password
            lista[action.index].newmode = false
            
            if (action.id_cred !== undefined) {lista[action.index].id_cred = action.id_cred;}

            return [...lista];
        }
        default: return state;
    }
}

export default credReducer;