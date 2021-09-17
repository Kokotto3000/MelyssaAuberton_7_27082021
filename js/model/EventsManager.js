import { 
    NAV_SEARCH,
    SEARCH_WORLDS,
    RECIPE_CARDS, 
    DROPDOWN_INPUTS,
    BUTTONS, 
    INGREDIENTS_SUGGESTIONS_CONTAINER, 
    INGREDIENTS_DROPDOWN,
    APPAREILS_SUGGESTIONS_CONTAINER,
    APPAREILS_DROPDOWN,
    USTENSILES_DROPDOWN,
    USTENSILES_SUGGESTIONS_CONTAINER, 
    INGREDIENTS_SUGGESTIONS_LIST,
    APPAREILS_SUGGESTIONS_LIST,
    USTENSILES_SUGGESTIONS_LIST
} from "./globals.js";
import Search from "./Search.js";
import Display from "./Display.js";
import Filter from "./Filter.js";
import { recipes } from "../data/recipes.js";

export default class EventsManager{
    constructor(){
        this.display= new Display();
        this.navigationInput= NAV_SEARCH;
        // this.ingredientsInput= INGREDIENTS_INPUT;
        // this.appareilsInput= APPAREILS_INPUT;
        // this.ustensilesInput= USTENSILES_INPUT;
        this.dropdownInputs= DROPDOWN_INPUTS; 
        this.buttons= BUTTONS;
    }

    initResearch(){
        const search= new Search();

        this.navigationInput.addEventListener('input', (e)=>{
            e.preventDefault();
            search.navigationResearch(this.navigationInput.value);
        });

        search.dropdownResearch(recipes, "init");

        this.dropdownInputs.forEach(input=> {
            input.addEventListener("input", ()=> {
                // console.log(input.attributes.target.value)
                search.dropdownInputResearch(input.attributes.target.value, input.value);
            });
        });
        
        this.buttons.forEach(button=> {
            button.addEventListener("click", ()=> {
                console.log(button.id)

                //il faut une différence avec l'autre liste ici
                if(button.id === "ingredients-button") {
                    INGREDIENTS_DROPDOWN.classList.toggle("invisible-div");
                    INGREDIENTS_SUGGESTIONS_CONTAINER.classList.toggle("visible-div");
                    button.classList.toggle("up");
                }

                if(button.id === "appareils-button") {
                    APPAREILS_DROPDOWN.classList.toggle("invisible-div");
                    APPAREILS_SUGGESTIONS_CONTAINER.classList.toggle("visible-div");
                    button.classList.toggle("up");
                }

                if(button.id === "ustensiles-button") {
                    USTENSILES_DROPDOWN.classList.toggle("invisible-div");
                    USTENSILES_SUGGESTIONS_CONTAINER.classList.toggle("visible-div");
                    button.classList.toggle("up");
                }
            })
        })

    }

    onClickSuggestion(suggestions, results, typeOfResult){
        
        suggestions.forEach(suggestion => {
            suggestion.addEventListener("click", ()=> {
                // if(typeOfResult === "dropdown") SEARCH_WORLDS.innerHTML= "";
                

                if(typeOfResult === "input") this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value);
                else this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value, recipes);
                // filtre des tags
                const filter= new Filter(results, suggestion.attributes.target.value, suggestion.textContent);
                this.dropdownInputs.forEach(input=> input.value= "");
                INGREDIENTS_SUGGESTIONS_LIST.classList.remove("show");
                APPAREILS_SUGGESTIONS_LIST.classList.remove("show");
                USTENSILES_SUGGESTIONS_LIST.classList.remove("show");
                INGREDIENTS_SUGGESTIONS_CONTAINER.classList.remove("visible-div");
                INGREDIENTS_DROPDOWN.classList.remove("invisible-div");
                APPAREILS_SUGGESTIONS_CONTAINER.classList.remove("visible-div");
                APPAREILS_DROPDOWN.classList.remove("invisible-div");
                USTENSILES_SUGGESTIONS_CONTAINER.classList.remove("visible-div");
                USTENSILES_DROPDOWN.classList.remove("invisible-div");

                this.navigationInput.value= "";
            });
        });   
    }

    //ajouter un event sur les boutons créés pour les supprimer si on reclique dessus
    //relancer une recherche avec les éléments qui se trouvent dans la zone
    onClickTags(){
        
        let SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
        SEARCH_WORLDS_BUTTONS.forEach(button=> {
            button.addEventListener("click", ()=> {
                SEARCH_WORLDS.removeChild(button);
                SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
                console.log(SEARCH_WORLDS_BUTTONS);
                if(SEARCH_WORLDS_BUTTONS.length > 0){
                    // console.log(results);
                    SEARCH_WORLDS_BUTTONS.forEach(button=> {
                    const filter= new Filter(recipes, button.attributes.target.value, button.textContent);
                    });
                }else{
                    const search= new Search();
                    search.dropdownResearch(recipes);
                    RECIPE_CARDS.innerHTML= "";                                        
                }
            });            
        });
        
        
        
        
    }
}