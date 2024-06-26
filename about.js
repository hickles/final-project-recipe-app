document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const recipeContainer = document.getElementById('recipeContainer2');

    searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); //needed chat gpt help with this
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.value.trim()}`)
            .then(response => response.json())
            .then(data => displayRecipes(data.meals));
    });

    function displayRecipes(recipes) {
        recipeContainer.innerHTML = ''; 

        if (recipes) { //needed chat gpt help with this section
            recipes.forEach(recipe => {
                const card = document.createElement('div'); 
                card.classList.add('recipe'); 
                card.innerHTML = `
                    <h3>${recipe.strMeal}</h3>
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                `;
                recipeContainer.appendChild(card); 
            });
        } else {
            recipeContainer.innerHTML = '<p>No recipes found with this ingredient.</p>';
        }
    }
});







