

export const validate = (input, item) => {
  let errors = {}

  if(item === 'name') {
    if(!input.name) errors.name = 'Must have a name'
  }

  if(item === 'points') {
    if(Number(input.points) < 0 || Number(input.points) > 100) {
      errors.points = 'Must be a number between 0 and 100'
    }
  }

  if(item === 'healthness') {
    if(Number(input.healthness) < 0 || Number(input.healthness) > 100) {
      errors.healthness = 'Must be a number between 0 and 100'
    }
  }

  return errors
}