

//Remind a === a.reverse() so gotta make a new array in order to make a state change and re render
export const personalSorts = {
  orderAlph: function(posts) {
    return posts.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1)
  },
  orderAlphRev: function(posts) {
    return posts.sort((a,b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : -1)
  },
  orderByPoints: function(posts) {
    return posts.sort((a,b)=> a.points - b.points).reverse()
  },
  orderByPointsRev: function(posts) {
    return posts.sort((a,b)=> a.points - b.points)
  },
  filterByDiet: function(posts, dietName) {
    let sorted = posts.filter(p => p.diets.includes(dietName.toLowerCase()))
    if(sorted.length) { return sorted }
    else {return ['empty']}
  }
};