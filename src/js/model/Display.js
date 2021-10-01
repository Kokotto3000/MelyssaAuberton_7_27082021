import { 
    RECIPE_CARDS,
    INGREDIENTS_SUGGESTIONS, 
    APPAREILS_SUGGESTIONS, 
    USTENSILES_SUGGESTIONS, 
    SEARCH_WORLDS 
} from "./globals";

// classe qui gère les affichages
export default class Display{
    constructor(){
        // this.recipes= recipes;
        this.recipeCards= RECIPE_CARDS;
    }

    //méthode pour l'affichage du contenu des dropdowns
    displayDropdowns(ingredients, appareils, ustensiles){
        INGREDIENTS_SUGGESTIONS.forEach(suggestion=> {
            suggestion.innerHTML= ingredients.map(ingredient => `<li class="suggestion primary" target="ingredients" cliquable="true"><button class="dropdown-item" type="button">${ingredient}</button></li>`).join("");
        });

        APPAREILS_SUGGESTIONS.forEach(suggestion=> {
            suggestion.innerHTML= appareils.map(appareil => `<li class="suggestion success" target="appareils" cliquable="true"><button class="dropdown-item" type="button">${appareil}</button></li>`).join("");
        });

        USTENSILES_SUGGESTIONS.forEach(suggestion=> {
            suggestion.innerHTML= ustensiles.map(ustensile => `<li class="suggestion danger" target="ustensiles" cliquable="true"><button class="dropdown-item" type="button">${ustensile}</button></li>`).join("");
        });
        const DROPDOWN_BUTTONS= document.querySelectorAll(".suggestion");
        return DROPDOWN_BUTTONS;
    }

    //méthode pour l'affichage des recettes
    //template des recettes à afficher avec les données envoyées par search
    displayRecipes(recipe){
        
        if(recipe){            
            RECIPE_CARDS.innerHTML+= 
                `<div class="col">
                    <div class="card h-100">
                        <img src="../assets/photos/${recipe.image}" class="card-img-top bg-secondary" alt="#" width="400" height="200" />
                        <div class="card-body row bg-light">
                            <div class="col-md">
                                <h2 class="card-title">${recipe.name}</h2>
                                <ul class="p-0">
                                    ${recipe.ingredients.map(ingredient => `<li> ${ingredient.ingredient} ${ingredient.quantity ? " : <span>" + ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</span></li>`).join("")}
                                </ul>
                            </div>

                            <div class="col-md">
                                <h3 class="text-end d-flex justify-content-end align-items-center"><i class="far fa-clock"></i>${recipe.time} min</h3>
                                <p class="card-text">${recipe.description}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        }else RECIPE_CARDS.innerHTML= "";        
    }

    //méthode pour l'affichage des tags
    displayTags(world, type, target){        
        SEARCH_WORLDS.innerHTML += `<button type="button" class="btn btn-${type} me-2 tag" target="${target}">${world}<span><i class="far fa-times-circle"></i></span></button>`;  
    }

    displayErrorMessage(){
        RECIPE_CARDS.innerHTML= `<div class="error-message p-5"><h2>Aucune recette ne correspond à votre critère...</h2><p>Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p><img class="img-fluid" src="../assets/hungry.png" alt="logo d'un personnage qui a faim" /></div>`;
    }
}