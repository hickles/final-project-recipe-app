document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const recipeContainer = document.getElementById('recipeContainer');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchValue = searchInput.value.trim();

        if (searchValue !== '') {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
                .then(response => response.json())
                .then(data => {
                    displayRecipes(data.meals);
                });
        } else {
            alert('Please enter a search query.');
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
                            <p class="card-text">Country: ${recipe.strArea}</p>
                        </div>
                    </div>
                `;
                card.innerHTML = cardContent;
                recipeContainer.appendChild(card);
            });
        } else {
            recipeContainer.innerHTML = '<p>No recipes found.</p>';
        }
    }
});

