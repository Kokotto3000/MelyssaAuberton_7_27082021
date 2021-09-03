import { NAV_SEARCH, SEARCH_SUGGESTIONS } from "./globals.js";
import Search from "./Search.js";
import Display from "./Display.js";

export default class EventsManager{
    constructor(){
        this.search= new Search();
        this.navigationInput= NAV_SEARCH.elements["nav-search"];
    }

    init(){
        this.navigationInput.addEventListener('input', ()=>{
            this.search.navigationResearch();
        });
    }

    onClickSuggestion(suggestion, results){
        suggestion.addEventListener("click", ()=> {
            const displayRecipe= new Display();
            this.navigationInput.value= suggestion.textContent;
            //et vide la liste
            SEARCH_SUGGESTIONS.innerHTML= "";
            displayRecipe.displayRecipes(results.filter(result=> result.name.toLowerCase().includes(suggestion.textContent.toLowerCase())));
            });
    }
}