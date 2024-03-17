const searchBox = document.querySelector('.searchBox');

const searchBtn = document.querySelector('.searchBtn');

const container = document.querySelector('.container');

const recipeContent = document.querySelector('.recipe_content');

const recipeClose = document.querySelector('.close');
//function to get recipes
const fetchRecipes = async (query) => {
    container.innerHTML = "<h2>Fetching Recipes........</h2>";
    try{
        const data =await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response =await data.json();
        container.innerHTML = " ";

        response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
                <img src ="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>
                
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        //Add eventlistner to recipe button
            button.addEventListener('click', () =>{
                openRecipePopup(meal);
            });

        container.appendChild(recipeDiv)
        });
    }
    catch(error){
        container.innerHTML = "<h2>Error in fetching Recipes........</h2>"
    }
}
//fetch ingredients and measurements
const fetchIngredients = (meal) =>{
    console.log(meal);
    let ingredientList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;

}

const openRecipePopup = (meal) => {
    recipeContent.innerHTML= `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <ul>${meal.strInstructions}</ul>
    </div>
    `
    recipeContent.parentElement.style.display = "block";
}
recipeClose.addEventListener('click',() => {
    recipeContent.parentElement.style.display = "none";
});
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});