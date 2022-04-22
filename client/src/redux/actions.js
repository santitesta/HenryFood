import axios from "axios"

export const GET_RECIPES = "GET_RECIPES"
export const GET_DIETS = "GET_DIETS"

export const getAllRecipes = () => {
    return function(dispatch){
        return axios("http://localhost:3001/recipe")
            .then(resp => dispatch({type: GET_RECIPES, payload: resp.data}))
            .catch(error => console.log(error))
    }
}

export const getAllDiets = () => {
    return function(dispatch){
        return axios("http://localhost:3001/diet")
            .then(resp => dispatch({type: GET_DIETS, payload: resp.data}))
            .catch(error => console.log(error))
    }
}

export const createRecipe = (recipe) => {
    return function(dispatch){
        return axios.post("http://localhost:3001/recipe", recipe)
            .then(resp => console.log('Recipe created successfully!'))
            .catch(error => console.log(error))
    }
}