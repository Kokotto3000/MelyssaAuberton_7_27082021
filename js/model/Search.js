import { recipes } from "../data/recipes.js";
import { NAV_SEARCH, INGREDIENTS_SUGGESTIONS } from "./globals.js";
import Display from "./Display.js";
import EventsManager from "./EventsManager.js";

export default class Search{
    constructor(){
        this.recipes= recipes;
        this.checkMessage= /^[\s\S]{3,}/;
        this.navigationInput= NAV_SEARCH.elements["nav-search"];
    }

    navigationResearch(){
        const displaySuggestions= new Display();
        if(this.checkMessage.test(this.navigationInput.value.trim())){
            //doit chercher dans les name, ingredients, description et non pas transmettre à la div que j'avais faite pas aux tags
            
            this.input= this.navigationInput.value.toLowerCase();

            this.results= []
            this.recipes.forEach( recipe => {                
                if(recipe.name.toLowerCase().includes(this.input)){
                    this.results.push(recipe);
                    return;
                }else{
                    if(recipe.description.toLowerCase().includes(this.input)){
                        this.results.push(recipe);
                        return;
                    }else{
                        recipe.ingredients.forEach(ingredients => {
                            if(ingredients.ingredient.toLowerCase().includes(this.input)) this.results.push(recipe);
                            // console.log(ingredients.ingredient);
                        });
                    }                
                }
            });

            // console.log(this.results);

            // ces tableaux seraient peut-être à mettre dans une nouvelle classe pour être aussi utiliser sans la recherche...
            // création d'un tableau d'ingrédients en fonction des résultats
            let ingredientsArray= [];
            this.results.forEach(result=> result.ingredients.forEach(ingredient=> ingredientsArray.push(ingredient.ingredient)));
            // console.log(ingredientsArray);
            ingredientsArray= Array.from(new Set(ingredientsArray));
            // console.log(ingredientsArray);

            //création d'un tableau d'appareils
            let appareilsArray= [];
            this.results.forEach(result=> appareilsArray.push(result.appliance));            
            appareilsArray= Array.from(new Set(appareilsArray));
            // console.log(appareilsArray);

            //création d'un tableau d'ustensiles
            let ustensilesArray= [];
            this.results.forEach(result=> result.ustensils.forEach(ustensile => ustensilesArray.push(ustensile)));
            ustensilesArray= Array.from(new Set(ustensilesArray));
            // console.log(ustensilesArray);

                
            //affichage des recettes
            displaySuggestions.displayRecipes(this.results);
            
            
            //il faut trier la liste de tous les ingrédients pour envoi ce tableau à displayIngredients
            displaySuggestions.displayIngredients(ingredientsArray);
            displaySuggestions.displayAppareils(appareilsArray);
            displaySuggestions.displayUstensiles(ustensilesArray);

            const SUGGESTION_BUTTONS= document.querySelectorAll(".suggestion");

            const events= new EventsManager();
            events.onClickSuggestion(SUGGESTION_BUTTONS);
    
        }else displaySuggestions.displayRecipes(); 

    }
}