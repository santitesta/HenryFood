import {
    GET_RECIPES,
    GET_DIETS,
    GET_RECIPE_ID
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
        case GET_RECIPE_ID:
            return {...state, recipe: payload}
        default: return state;
    }
}