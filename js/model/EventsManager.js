import { 
    NAV_SEARCH, 
    SEARCH_WORLDS,
    RECIPE_CARDS, 
    DROPDOWN_INPUTS
} from "./globals.js";
import Search from "./Search.js";
import Display from "./Display.js";
import Filter from "./Filter.js";
import FilterByInput from "./FilterByInput.js";



export default class EventsManager{
    constructor(array){
        this.display= new Display();
        this.navigationInput= NAV_SEARCH;
        this.dropdownInputs= DROPDOWN_INPUTS;
        this.array= array;
        
    }

    initResearch(){
        const search= new Search(this.array);

        this.navigationInput.addEventListener('input', ()=>{
            search.navigationResearch(this.navigationInput.value);
        });
    }

    onClickSuggestion(suggestions, results){
        const SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
        
        const buttonsName= [];
        for(const button of SEARCH_WORLDS_BUTTONS){
            buttonsName.push(button.textContent);
        }   
        
        suggestions.forEach(suggestion => {
            
            suggestion.addEventListener("click", ()=> {
                
                if(SEARCH_WORLDS_BUTTONS.length > 0){
                    if(buttonsName.includes(suggestion.textContent)) return;                    
                }
                    
                this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value);
                // filtre des tags
                const filter= new Filter(results, suggestion.attributes.target.value, suggestion.textContent, this.array);

                this.dropdownInputs.forEach(input=> input.value= "");
                this.navigationInput.value= "";
                this.onClickTags();
                
            });
        });   
    }

    onInputDropdowns(results, ingredients, appareils, ustensiles, array){

        for(const input of this.dropdownInputs){
            input.addEventListener("input", ()=> {
                const filter= new FilterByInput(results, ingredients, appareils, ustensiles, input.attributes.target.value, input.value.toLowerCase(), array);
                this.onClickTags();
            })
            
        }
    }

    onClickTags(){
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
                    
                    const search= new Search(this.array);
                    RECIPE_CARDS.innerHTML= "";                                        
                }
            });            
        });
    }
}