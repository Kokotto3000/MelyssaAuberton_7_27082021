import { recipes } from "../data/recipes.js";
import { NAV_SEARCH } from "./globals.js";
import Display from "./Display.js";

export default class Search{
    constructor(){
        this.recipes= recipes;
        this.checkMessage= /^[\s\S]{3,}/;
        this.navigationInput= NAV_SEARCH.elements["nav-search"];
    }

    navigationResearch(){
        if(this.checkMessage.test(this.navigationInput.value.trim())){
            this.value= this.navigationInput.value;
            console.log(`Je commence la recherche de ${this.value}`);
            //console.log(this.recipes);
            //boucle sur les réponses qui créent une instance de display.display
            /*for(let i=0; i < 3; i++){
                const displayRecipe= new Display();
                displayRecipe.displayRecipes();
            }*/
            this.recipes.forEach(recipe => {
                const displayRecipe= new Display();
                displayRecipe.displayRecipes(recipe);
            });
        }
    }
}