import {
    GET_RECIPES
} from "./actions"

const initialState={
    recipes: [],
    diets: [],
    recipe: {}
}

export function rootReducer(state = initialState, {type, payload}){
    switch (type) {
        case GET_RECIPES:
            let arr = payload
            return {...state, recipes: arr}
        default: return state;
    }
}