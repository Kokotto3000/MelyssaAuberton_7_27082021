import EventsManager from "./model/EventsManager.js";
import { recipes } from "./data/recipes.js";
import Display from "./model/Display.js";
import { ingredientsArray, appareilsArray, ustensilesArray } from "./model/globals.js";

// il faut que tous les ingrédients... soient affichés dans le dropdown par défaut...
//garder l'idée des fonctions à appeler au départ dans d'éventuelles classes type dropdown


function dropDownInit(){
    const dropdowns= new Display();
    dropdowns.displayIngredients(ingredientsArray);
    dropdowns.displayAppareils(appareilsArray);
    dropdowns.displayUstensiles(ustensilesArray);
    const DROPDOWN_BUTTONS= document.querySelectorAll(".suggestion");
    return DROPDOWN_BUTTONS;
}

dropDownInit();

const events= new EventsManager();
events.initNavigationSearch();

events.onClickSuggestion(dropDownInit(), recipes);
