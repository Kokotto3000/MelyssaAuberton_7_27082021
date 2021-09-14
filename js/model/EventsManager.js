import { NAV_SEARCH, ingredientsArray, appareilsArray, ustensilesArray, SEARCH_WORLDS, RECIPE_CARDS, dropDownInit } from "./globals.js";
import Search from "./Search.js";
import Display from "./Display.js";
import Filter from "./Filter.js";
import { recipes } from "../data/recipes.js";

export default class EventsManager{
    constructor(){
        this.display= new Display();
        this.navigationInput= NAV_SEARCH.elements["nav-search"];
        this.initNavigationSearch();        
    }

    initNavigationSearch(){
        const search= new Search();
        this.navigationInput.addEventListener('change', ()=>{
            search.navigationResearch();
        });
    }

    onClickSuggestion(suggestions, results){
        
        suggestions.forEach(suggestion => {
            suggestion.addEventListener("click", ()=> {
                // console.log(suggestion.attributes.target.value);
                // console.log(suggestion.attributes.target);
                this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value, results);
                // filtre des tags
                const filter= new Filter(results, suggestion.attributes.target.value, suggestion.textContent);
                // filter.filterByIngredients(suggestion.textContent);
                // filter.filterByAppareils(suggestion.textContent);
                // filter.filterByIngredients(suggestion.textContent);
            });
        });   
    }

    //ajouter un event sur les boutons créés pour les supprimer si on reclique dessus
    //relancer une recherche avec les éléments qui se trouvent dans la zone
    onClickTags(results){
        
        let SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
        SEARCH_WORLDS_BUTTONS.forEach(button=> {
            button.addEventListener("click", ()=> {
                SEARCH_WORLDS.removeChild(button);
                SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
                console.log(SEARCH_WORLDS_BUTTONS);

                //trouver une solution ici si on retire le dernier bouton
                    SEARCH_WORLDS_BUTTONS.forEach(button=> {
                    console.log(button);
                    const filter= new Filter(results, button.attributes.target.value, button.textContent);
                    });
                
                    // dropDownInit();
                    // this.onClickSuggestion(document.querySelectorAll(".suggestion"), recipes);
                
                
                
                // const search= new Search();
                // search.tagsResearch(SEARCH_WORLDS.querySelectorAll("button"), results);
            });            
        });
        
        
        
        
    }
}