import { 
    NAV_SEARCH, 
    // SEARCH_WORLDS,
    // RECIPE_CARDS, 
    // DROPDOWN_INPUTS
} from "./globals.js";
import Search from "./Search.js";
// import Display from "./Display.js";
// import Filter from "./Filter.js";
// import { recipes } from "../data/recipes.js";

export default class EventsManager{
    constructor(){
        // this.display= new Display();
        this.navigationInput= NAV_SEARCH;
        
        // this.dropdownInputs= DROPDOWN_INPUTS;
    }

    initResearch(array){
        const search= new Search();

        this.navigationInput.addEventListener('input', ()=>{
            // e.preventDefault();
            search.navigationResearch(array, this.navigationInput.value);
        });

        // search.dropdownResearch(recipes, "init");

        // this.dropdownInputs.forEach(input=> {
        //     input.addEventListener("input", ()=> {
        //         search.dropdownInputResearch(input.attributes.target.value, input.value);
        //     });
        // });

    }

    // onClickSuggestion(suggestions, results, typeOfResult){
        
    //     suggestions.forEach(suggestion => {
    //         suggestion.addEventListener("click", ()=> {                

    //             if(typeOfResult === "input") this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value);
    //             else this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value, recipes);
    //             // filtre des tags
    //             const filter= new Filter(results, suggestion.attributes.target.value, suggestion.textContent);
    //             this.dropdownInputs.forEach(input=> input.value= "");
    //             this.navigationInput.value= "";

    //         });
    //     });   
    // }

    // //ajouter un event sur les boutons créés pour les supprimer si on reclique dessus
    // //relancer une recherche avec les éléments qui se trouvent dans la zone
    // onClickTags(){
        
    //     let SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
    //     SEARCH_WORLDS_BUTTONS.forEach(button=> {
    //         button.addEventListener("click", ()=> {
    //             SEARCH_WORLDS.removeChild(button);
    //             SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
                
    //             if(SEARCH_WORLDS_BUTTONS.length > 0){
    //                 SEARCH_WORLDS_BUTTONS.forEach(button=> {
    //                 const filter= new Filter(recipes, button.attributes.target.value, button.textContent);
    //                 });
    //             }else{
    //                 const search= new Search();
    //                 search.dropdownResearch(recipes);
    //                 RECIPE_CARDS.innerHTML= "";                                        
    //             }
    //         });            
    //     });
    // }
}