// Add JavaScript below
const btn = document.getElementById('generate');
const mealImage = document.getElementById('meal-image');
const mealName = document.getElementById('meal-name');
const ingredientsList = document.getElementById('ingredients-list');
const instructions = document.getElementById('instructions');

btn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const mealNameText = meal.strMeal;
            const mealImageSrc = meal.strMealThumb;
            const ingredients = [];
            const instructionsText = meal.strInstructions;
            
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (!ingredient) break;
                ingredients.push(`<li>${ingredient} - ${measure}</li>`);
            }

            mealImage.src = mealImageSrc;
            mealName.textContent = mealNameText;
            ingredientsList.innerHTML = `<ul>${ingredients.join('')}</ul>`;
            instructions.textContent = instructionsText;
            recipeDetails.style.display = 'block'; // Show recipe details
        });
});
