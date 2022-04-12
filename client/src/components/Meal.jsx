import React from 'react';

function About({meal}) {
    console.log('In meal section: ' + meal)
  return (
    <div>
      <h2>The meal you look for: {meal.name}</h2>
    </div>
  );
};

export default About;