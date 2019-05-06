/**
 * games reducer
 */
function gamesReducer (state, action){
    switch (action.type) {
    case "update":
        return Object.assign({}, state, action.payload, {online: true});
    case "error":
        return Object.assign({}, state, action.payload);
    default:
        /*@TODO call error component*/
        throw new Error("undefined action type");
    }
}

/**
 * frequency reducer
 */
function frequencyReducer (state, action){
    return action.payload;
}

export { gamesReducer, frequencyReducer };
