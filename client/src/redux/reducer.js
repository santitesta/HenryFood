import {
    GET_RECIPES,
    GET_DIETS
} from "./actions"

const initialState={
    recipes: [],
    diets: [],
    recipe: {}
}

export function rootReducer(state = initialState, {type, payload}){
    switch (type) {
        case GET_RECIPES:
            return {...state, recipes: payload}
        case GET_DIETS:
            return {...state, diets: payload}
        default: return state;
    }
}