import axios from "axios"

export const GET_RECIPES = "GET_RECIPES"

export const getAllRecipes = () => {
    return function(dispatch){
        return axios("http://localhost:3001/recipe")
            .then(resp => dispatch({type: GET_RECIPES, payload: resp.data}))
            .catch(error => console.log(error))
    }
}