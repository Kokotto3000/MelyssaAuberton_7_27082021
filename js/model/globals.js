import { recipes } from "../data/recipes.js";
import Display from "./Display.js";

export const NAV_SEARCH= document.querySelector('nav form');
export const INGREDIENTS_SUGGESTIONS= document.getElementById("ingredients-suggestions");
export const APPAREILS_SUGGESTIONS= document.getElementById("appareils-suggestions");
export const USTENSILES_SUGGESTIONS= document.getElementById("ustensiles-suggestions");
export const RECIPE_CARDS= document.querySelector("#cards .row");
export const SEARCH_WORLDS= document.getElementById("search-worlds");

//essayer de faire une classe avec ces créations de tableaux, puisque le code est répété à plusieurs endroits
export let ingredientsArray= [];
recipes.forEach(recipe=> recipe.ingredients.forEach(ingredient=> ingredientsArray.push(ingredient.ingredient)));
ingredientsArray= Array.from(new Set(ingredientsArray));

export let appareilsArray= [];
recipes.forEach(recipe=> appareilsArray.push(recipe.appliance));            
appareilsArray= Array.from(new Set(appareilsArray));

export let ustensilesArray= [];
recipes.forEach(recipe=> recipe.ustensils.forEach(ustensile => ustensilesArray.push(ustensile)));
ustensilesArray= Array.from(new Set(ustensilesArray));

export function dropDownInit(){
    const display= new Display();
    display.displayIngredients(ingredientsArray);
    display.displayAppareils(appareilsArray);
    display.displayUstensiles(ustensilesArray);
    const DROPDOWN_BUTTONS= document.querySelectorAll(".suggestion");
    return DROPDOWN_BUTTONS;
}
