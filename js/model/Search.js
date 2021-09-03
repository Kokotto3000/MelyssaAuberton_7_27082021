import { recipes } from "../data/recipes.js";
import { NAV_SEARCH, SEARCH_SUGGESTIONS } from "./globals.js";
import Display from "./Display.js";
import EventsManager from "./EventsManager.js";

export default class Search{
    constructor(){
        this.recipes= recipes;
        this.checkMessage= /^[\s\S]{3,}/;
        this.navigationInput= NAV_SEARCH.elements["nav-search"];
    }

    navigationResearch(){
        if(this.checkMessage.test(this.navigationInput.value.trim())){
            
            this.input= this.navigationInput.value.toLowerCase();
            // console.log(`Je commence la recherche de ${this.input}`);

            this.results= this.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.input));

            if(this.input != ""){
                //affiche la liste des suggestions
                SEARCH_SUGGESTIONS.innerHTML= this.results.map(result => `<li class="suggestion">${result.name}</li>`).join("");
                //remplit la barre input du mots clés selectionné
                const SUGGESTIONS= document.querySelectorAll(".suggestion");
                //console.log(SUGGESTIONS)
                
                SUGGESTIONS.forEach(suggestion => {
                    const displayRecipe= new Display();
                    displayRecipe.displayRecipes(this.results);

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