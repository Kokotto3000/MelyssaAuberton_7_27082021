import Display from "./Display.js";
import EventsManager from "./EventsManager.js";

//méthode pour filtrer les suggestions en fonctions des entrées dans les inputs des dropdowns
export default class FilterByInput{
    constructor(results, ingredients, appareils, ustensiles, target, value, array){
        this.results= results;
        this.ingredientsArray= ingredients;
        this.appareilsArray= appareils;
        this.ustensilesArray= ustensiles;
        this.array= array;

        //switch sur les target pour envoyer vers la bonne méthode, syntaxe différente de filterByClick mais le principe est le même
        //on lance automatiquement ces méthodes qui font varier les tableaux en fonction...
        switch(target){
            case "ingredients" :
                this.filterByIngredients(value);
                break;
            case "appareils" :
                this.filterByAppareils(value);
                break;
            case "ustensiles" :
                this.filterByUstensiles(value);
                break;
            default :
                console.log("no type of filter");
        }

        //... avant de lancer ces classes avec les tableaux retournés en fonction du filtre
        this.display= new Display();
        this.suggestions= this.display.displayDropdowns(this.ingredientsArray, this.appareilsArray, this.ustensilesArray);
        this.events= new EventsManager(this.array);
        this.events.onClickSuggestion(this.suggestions, this.results);
        
    }

    filterByIngredients(value){
        
        this.ingredientsArray= this.ingredientsArray.filter(ingredient => ingredient.includes(value));
    }

    filterByAppareils(value){
        
        this.appareilsArray= this.appareilsArray.filter(appareil => appareil.includes(value));
    }

    filterByUstensiles(value){
        
        this.ustensilesArray= this.ustensilesArray.filter(ustensile => ustensile.includes(value));
    }
}