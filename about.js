document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const recipeContainer = document.getElementById('recipeContainer');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchValue = searchInput.value.trim();

        if (searchValue !== '') {
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    displayRecipes(data.meals);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            alert('Please enter an ingredient.');
        }
    });

    function displayRecipes(recipes) {
        recipeContainer.innerHTML = ''; // Clear previous results

        if (recipes) {
            recipes.forEach(recipe => {
                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');

                const cardContent = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.strMeal}</h5>
                            <p class="card-text">ID: ${recipe.idMeal}</p>
                        </div>
                    </div>
                `;
                card.innerHTML = cardContent;
                recipeContainer.appendChild(card);
            });
        } else {
            recipeContainer.innerHTML = '<p>No recipes found with this ingredient.</p>';
        }
    }
});



