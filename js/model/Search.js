import { recipes } from "../data/recipes.js";
import { NAV_SEARCH, SEARCH_SUGGESTIONS } from "./globals.js";
import Display from "./Display.js";
import EventsManager from "./EventsManager.js";

export default class Search{
    constructor(){
        this.recipes= recipes;
        this.checkMessage= /^[\s\S]{3,}/;
        this.navigationInput= NAV_SEARCH.elements["nav-search"];
        this.recipesIngredients= [];
        this.recipes.forEach(recipe => recipe.ingredients.forEach(ingredients => this.recipesIngredients.push([recipe, ingredients.ingredient])));
        // console.log(this.recipesIngredients);
    }

    navigationResearch(){
        if(this.checkMessage.test(this.navigationInput.value.trim())){
            //doit chercher dans les name, ingredients, description et non pas transmettre à la div que j'avais faite pas aux tags
            
            this.input= this.navigationInput.value.toLowerCase();
            // console.log(`Je commence la recherche de ${this.input}`);

            //hmmm ça marche pour les recheches avec nom et description, trouver soluce pour ingredients (enlever aussi les esapces avec replace () ?
            this.resultsByIngredients= this.recipesIngredients.filter(recipe => recipe[1].toLowerCase().includes(this.input));
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
                            console.log(ingredients.ingredient);
                        });
                    }
                
                }
            });
            // this.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.input) || recipe.description.toLowerCase().includes(this.input));
            
            //this.results= this.recipesIngredients.filter(recipe => recipe[1].toLowerCase().includes(this.input));
            //rahhhhh ne marche pas
            // this.ingredients= this.recipes.filter(recipe=> recipe.ingredients.toString().toLowerCase().includes(this.input));

            console.log(this.results);
            //console.log(this.resultsByIngredients);         

            // this.recipesIngredients.forEach(recipe => console.log(recipe));
            
            // this.resultsByIngredients= this.recipesIngredients.filter(ingredients => ingredients.ingredient.include(this.input));
            // console.log(this.resultsByIngredients);

            if(this.input != ""){
                
                //affiche la liste des suggestions
                SEARCH_SUGGESTIONS.innerHTML= this.results.map(result => `<li class="suggestion">${result.name}</li>`).join("") || this.results.map(result => `<li class="suggestion">${result[1].name}</li>`).join("");
                //remplit la barre input du mots clés selectionné
                const SUGGESTIONS= document.querySelectorAll(".suggestion");
                //console.log(SUGGESTIONS)
                
                SUGGESTIONS.forEach(suggestion => {
                    const displayRecipe= new Display();
                    displayRecipe.displayRecipes(this.results || this.resultsByIngredients);

                    const suggestions= new EventsManager();
                    suggestions.onClickSuggestion(suggestion, this.results);
                    // à mettre dans event manager si possible
                    // suggestion.addEventListener("click", ()=> {
                    // this.navigationInput.value= suggestion.textContent;
                    // //et vide la liste
                    // SEARCH_SUGGESTIONS.innerHTML= "";
                    // displayRecipe.displayRecipes(this.results.filter(result=> result.name.toLowerCase().includes(suggestion.textContent.toLowerCase())));
                    // });
                });
            }else SEARCH_SUGGESTIONS.innerHTML= "";            
        }
    }
}