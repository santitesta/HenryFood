import axios from "axios"

export const GET_RECIPES = "GET_RECIPES"
export const GET_RECIPE_ID = "GET_RECIPE_ID"
export const GET_DIETS = "GET_DIETS"

export const getRecipes = (query) => {
    return function(dispatch){
        return axios.get(`http://localhost:3001/recipe`, {params: {query: query}})
            .then(resp => dispatch({type: GET_RECIPES, payload: resp.data}))
            .catch(error => alert('Error in getRecipes: ',error))
    }
}

export const getRecipeById = (id) => {
    return function(dispatch){
        return axios.get(`http://localhost:3001/recipe/${id}`)
            .then(resp => dispatch({type: GET_RECIPE_ID, payload: resp.data}))
            .catch(error => alert(error))
    }
}

export const getAllDiets = () => {
    return function(dispatch){
        return axios("http://localhost:3001/diet")
            .then(resp => dispatch({type: GET_DIETS, payload: resp.data}))
            .catch(error => alert(error))
    }
}

export const createRecipe = (recipe) => {
    return function(){
        return axios.post("http://localhost:3001/recipe", recipe)
            .then(alert('Successfully created!'))
            .catch(error => alert(error))
    }
}