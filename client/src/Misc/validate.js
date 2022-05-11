

export const validate = (input) => {
  let errors = {}

  if(!input.name) errors.name = 'Must have a name'
  let pattern = /^[a-zA-Z0-9]*$/
  if(!pattern.test(input.name)) errors.name = 'Cannot contain special characters'

  if(Number(input.points) < 0 || Number(input.points) > 100) {
    errors.points = 'Must be a number between 0 and 100'
  }

  if(Number(input.healthness) < 0 || Number(input.healthness) > 100) {
    errors.healthness = 'Must be a number between 0 and 100'
  }

  return errors
}