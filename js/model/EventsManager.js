import { NAV_SEARCH, SEARCH_WORLDS, RECIPE_CARDS } from "./globals.js";
import Search from "./Search.js";
import Display from "./Display.js";
import Filter from "./Filter.js";
import { recipes } from "../data/recipes.js";

export default class EventsManager{
    constructor(){
        this.display= new Display();
        this.navigationInput= NAV_SEARCH.elements["nav-search"];        
    }

    initResearch(){
        const search= new Search();
        this.navigationInput.addEventListener('input', ()=>{
            search.navigationResearch();
        });
        search.dropdownResearch(recipes, "init");
    }

    onClickSuggestion(suggestions, results, typeOfResult){
        
        suggestions.forEach(suggestion => {
            suggestion.addEventListener("click", ()=> {
                if(typeOfResult === "input") this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value, results, typeOfResult);
                else this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value, recipes);
                // filtre des tags
                const filter= new Filter(results, suggestion.attributes.target.value, suggestion.textContent);
            });
        });   
    }

    //ajouter un event sur les boutons créés pour les supprimer si on reclique dessus
    //relancer une recherche avec les éléments qui se trouvent dans la zone
    onClickTags(results, typeOfResult){
        
        let SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
        SEARCH_WORLDS_BUTTONS.forEach(button=> {
            button.addEventListener("click", ()=> {
                SEARCH_WORLDS.removeChild(button);
                SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
                console.log(SEARCH_WORLDS_BUTTONS);
                if(SEARCH_WORLDS_BUTTONS.length > 0){
                    SEARCH_WORLDS_BUTTONS.forEach(button=> {
                    const filter= new Filter(results, button.attributes.target.value, button.textContent);
                    });
                }else{
                    console.log(typeOfResult);
                    // console.log("pas de boutons");
                    const search= new Search();
                    search.dropdownResearch(results);
                    if(!typeOfResult || typeOfResult === "init") RECIPE_CARDS.innerHTML= "";                                        
                }
            });            
        });
        
        
        
        
    }
}