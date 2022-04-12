import React, { useState } from "react";

export default function SearchBar({onSearch}) {
  const [meal, setMeal] = useState("");
  return (
    <form id="myForm" onSubmit={(e) => {
      e.preventDefault();
      onSearch(meal);
      document.getElementById("myForm")[0].value = '';
    }}>
      <input
        type="text"
        placeholder="Meal..."
        value={meal}
        onChange={e => setMeal(e.target.value)}
      />
      <input type="submit" value="Agregar"/>
    </form>
  );
}