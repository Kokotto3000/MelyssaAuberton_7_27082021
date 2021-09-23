import Display from "./Display.js";
import EventsManager from "./EventsManager.js";

export default class FilterByInput{
    constructor(results, ingredients, appareils, ustensiles, target, value, array){
        this.checkMessage= /^[\s\S]{3,}/;
        this.results= results;
        this.ingredientsArray= ingredients;
        this.appareilsArray= appareils;
        this.ustensilesArray= ustensiles;
        this.array= array;

        switch(target){
            case "ingredient" :
                this.filterByIngredients(value);
                break;
            case "appareil" :
                this.filterByAppareils(value);
                break;
            case "ustensile" :
                this.filterByUstensiles(value);
                break;
            default :
                console.log("no type of filter, tindin");
        }

        this.display= new Display();
        this.suggestions= this.display.dropDownInit(this.ingredientsArray, this.appareilsArray, this.ustensilesArray);
        this.events= new EventsManager(this.array);
        this.events.onClickSuggestion(this.suggestions, this.results);
        
    }

    filterByIngredients(value){
        
        this.ingredientsArray= this.ingredientsArray.filter(ingredient => ingredient.toLowerCase().includes(value));
    }

    filterByAppareils(value){
        
        this.appareilsArray= this.appareilsArray.filter(appareil => appareil.toLowerCase().includes(value));
    }

    filterByUstensiles(value){
        
        this.ustensilesArray= this.ustensilesArray.filter(ustensile => ustensile.toLowerCase().includes(value));
    }
}