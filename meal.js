const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const mealResults = document.getElementById('mealResults');
const showAllBtn = document.getElementById('showAllBtn');

searchBtn.addEventListener('click', searchMeal);

function searchMeal() {
  const searchText = searchInput.value.trim();
  if (searchText === '') {
    alert('Please enter a meal name.');
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then(response => response.json())
    .then(data => {
      mealResults.innerHTML = ''; // Clear previous results

      if (data.meals === null) {
        mealResults.innerHTML = '<p>No meals found.</p>';
        return;
      }

      // Show up to 5 meals
      const mealsToShow = data.meals.slice(0, 5);
      mealsToShow.forEach(meal => {
        const mealCard = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Meal ID: ${meal.idMeal}</small>
              </div>
            </div>
          </div>
        `;
        mealResults.innerHTML += mealCard;
      });

      if (data.meals.length > 5) {
        showAllBtn.classList.remove('d-none');
      } else {
        showAllBtn.classList.add('d-none');
      }
    })
    .catch(error => {
      console.error('Error fetching meal data:', error);
      mealResults.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    });
}

showAllBtn.addEventListener('click', () => {
  const searchText = searchInput.value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then(response => response.json())
    .then(data => {
      mealResults.innerHTML = ''; // Clear previous results

      if (data.meals === null) {
        mealResults.innerHTML = '<p>No meals found.</p>';
        return;
      }

      data.meals.forEach(meal => {
        const mealCard = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Meal ID: ${meal.idMeal}</small>
              </div>
            </div>
          </div>
        `;
        mealResults.innerHTML += mealCard;
      });

      showAllBtn.classList.add('d-none');
    })
    .catch(error => {
      console.error('Error fetching meal data:', error);
      mealResults.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    });
});