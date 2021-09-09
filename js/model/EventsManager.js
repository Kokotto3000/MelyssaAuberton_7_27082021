import { NAV_SEARCH } from "./globals.js";
import Search from "./Search.js";
import Display from "./Display.js";
import Filter from "./Filter.js";

export default class EventsManager{
    constructor(){
        this.navigationInput= NAV_SEARCH.elements["nav-search"];
    }

    initNavigationSearch(){
        const search= new Search();
        this.navigationInput.addEventListener('input', ()=>{
            search.navigationResearch();
        });
    }

    onClickSuggestion(suggestions, results){
        console.log(suggestions);

        const display= new Display();
        
        suggestions.forEach(suggestion => {
            suggestion.addEventListener("click", ()=> {
                console.log(suggestion.attributes.target.value);
                display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1]);
                // filtre des tags
                const filter= new Filter(results, suggestion.attributes.target.value, suggestion.textContent);
                // filter.filterByIngredients(suggestion.textContent);
                // filter.filterByAppareils(suggestion.textContent);
                // filter.filterByIngredients(suggestion.textContent);
            });
        });   
    }

    //ajouter un event sur les boutons créés pour les supprimer si on reclique dessus
}