import { RECIPE_CARDS } from "./globals.js";
// import { recipes } from "../data/recipes.js";

export default class Display{
    constructor(search){
        //template des recettes à afficher avec les données envoyées par search
        // this.recipes= recipes;
        this.recipeCards= RECIPE_CARDS;
    }

    displayRecipes(recipes){
        console.log(recipes);
        RECIPE_CARDS.innerHTML= "";
        recipes.forEach(recipe => {
            RECIPE_CARDS.innerHTML+= `<div class="col">
                <div class="card h-100">
                    <img src="https://picsum.photos/400/200" class="card-img-top bg-secondary" alt="#" width="400" height="200" />
                    <div class="card-body row bg-light">
                        <div class="col-md">
                            <h2 class="card-title">${recipe.name}</h2>
                            <ul class="p-0">
                                ${recipe.ingredients.map(ingredient => `<li> ${ingredient.ingredient} ${ingredient.quantity ? " : <span>" + ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</span></li>`).join("")}
                            </ul>
                        </div>

                        <div class="col-md">
                            <h3 class="text-end d-flex justify-content-end align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock me-1" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                            </svg>${recipe.time} min</h3>
                            <p class="card-text">${recipe.description}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        });        
    }
}