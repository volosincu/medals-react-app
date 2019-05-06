
import { gamesReducer, frequencyReducer } from '../reducers';


describe("test Games component", ()=> {

    it("test games reducer update action type", ()=>{
        const initialState = {},
            state = {id: 1},
            action = {type: "error", payload: state},
            newState = gamesReducer(initialState, action);

        expect(newState).toEqual(state);
    });

    it("test games reducer error action type", ()=>{
        const initialState = {},
            state = {online: false},
            action = {type: "error", payload: state},
            newState = gamesReducer(initialState, action);

        expect(newState).toEqual(state);
    });

    it("test games reducer wrong action type", ()=>{
        const initialState = {};
        expect(()=>{
            gamesReducer(initialState, {type: "val"});
        }).toThrow();
    });

    it("test frequencyReducer", ()=>{
        const initialState = {},
            state = {frequency: 1},
            action = {payload: state},
            newState = frequencyReducer(initialState, action);

        expect(newState).toEqual(state);
    });

});
