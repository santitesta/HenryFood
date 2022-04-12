import React from 'react';

function About({meal}) {
  if (!meal) {
    return <p>Please search for a meal!</p>;
  }
  return (
    <div>
      <h2>The meal you look for: {meal.name}</h2>
    </div>
  );
};

export default About;