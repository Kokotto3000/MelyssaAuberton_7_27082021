import { 
    NAV_SEARCH, 
    SEARCH_WORLDS,
    RECIPE_CARDS, 
    DROPDOWN_INPUTS
} from "./globals.js";
import Search from "./Search.js";
import Display from "./Display.js";
import Filter from "./Filter.js";
// import { recipes } from "../data/recipes.js";

export default class EventsManager{
    constructor(array){
        this.display= new Display();
        this.navigationInput= NAV_SEARCH;
        this.dropdownInputs= DROPDOWN_INPUTS;
        this.array= array;
        //trouver une solution pour qu'il ne soit pas appelé 2 fois dès l'initiation
        // console.log(this.array);
    }

    initResearch(){
        const search= new Search(this.array);

        this.navigationInput.addEventListener('input', ()=>{
            // e.preventDefault();
            search.navigationResearch(this.navigationInput.value);
        });

        // search.dropdownResearch(this.array);

        // for(const input of this.dropdownInputs){
        //     input.addEventListener("input", ()=>{
        //         // const filter= new Filter(this.array, input.attributes.target.value, input.value.toLowerCase(), this.array);
        //         search.dropdownInputResearch(results, input.attributes.target.value, input.value);
        //     });
        // }
    }

    onClickSuggestion(suggestions, results){
        
        suggestions.forEach(suggestion => {
            suggestion.addEventListener("click", ()=> {                
                
                this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value);
                // else this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value, recipes);
                // filtre des tags
                const filter= new Filter(results, suggestion.attributes.target.value, suggestion.textContent, this.array);
                // this.dropdownInputs.forEach(input=> input.value= "");
                this.navigationInput.value= "";
                this.onClickTags();
            });
        });   
    }

    // //ajouter un event sur les boutons créés pour les supprimer si on reclique dessus
    // //relancer une recherche avec les éléments qui se trouvent dans la zone
    onClickTags(){
        // console.log(results);
        let SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
        SEARCH_WORLDS_BUTTONS.forEach(button=> {
            button.addEventListener("click", ()=> {
                SEARCH_WORLDS.removeChild(button);
                SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
                
                if(SEARCH_WORLDS_BUTTONS.length > 0){
                    SEARCH_WORLDS_BUTTONS.forEach(button=> {
                    const filter= new Filter(this.array, button.attributes.target.value, button.textContent, this.array);
                    });
                }else{
                    console.log(this.array)
                    const search= new Search(this.array);
                    // search.dropdownResearch();
                    RECIPE_CARDS.innerHTML= "";                                        
                }
            });            
        });
    }
}