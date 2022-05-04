

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
    return posts.filter(p => p.diets.includes(dietName.toLowerCase()))
  }
};