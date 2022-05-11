

export const validate = (input) => {
  let errors = {}

  if(!input.name) errors.name = 'Must have a name'
  let pattern = /^[a-zA-Z0-9]*$/
  if(!pattern.test(input.name)) errors.name = 'Cannot contain special characters'

  if(Number(input.points) < 0 || Number(input.points) > 100) {
    errors.points = 'Must be a number between 0 and 100'
  }

  if(Number(input.healthScore) < 0 || Number(input.healthScore) > 100) {
    errors.healthScore = 'Must be a number between 0 and 100'
  }

  return errors
}