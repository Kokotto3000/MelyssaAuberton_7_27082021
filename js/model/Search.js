import { recipes } from "../data/recipes.js";
import Display from "./Display.js";
import EventsManager from "./EventsManager.js";
import { INGREDIENTS_SUGGESTIONS, APPAREILS_SUGGESTIONS, USTENSILES_SUGGESTIONS } from "./globals.js";

export default class Search{
    constructor(){
        this.recipes= recipes;
        this.checkMessage= /^[\s\S]{3,}/;
        // this.navigationInput= NAV_SEARCH.elements["nav-search"];
        this.display= new Display();        
    }

    navigationResearch(value){
        
        if(this.checkMessage.test(value.trim())){
            //doit chercher dans les name, ingredients, description et non pas transmettre à la div que j'avais faite pas aux tags
            
            this.input= value.toLowerCase();

            this.results= [];
            this.recipes.forEach( recipe => {                
                if(recipe.name.toLowerCase().includes(this.input)){
                    this.results.push(recipe);
                    return;
                }else{
                    if(recipe.description.toLowerCase().includes(this.input)){
                        this.results.push(recipe);
                        return;
                    }else{
                        recipe.ingredients.forEach(ingredients => {
                            if(ingredients.ingredient.toLowerCase().includes(this.input)) this.results.push(recipe);
                            // console.log(ingredients.ingredient);
                        });
                    }                
                }
            });

            // console.log(this.results);

            this.dropdownResearch(this.results, "input");
            
    
        }else this.display.displayRecipes();
    }

    dropdownInputResearch(type, value){
        if(this.checkMessage.test(value.trim())){
            this.input= value.toLowerCase();
            this.results= [];
            switch(type){
                case "ingredients":
                    console.log(value);
                    this.recipes.forEach(recipe=> {
                        recipe.ingredients.forEach(ingredients => {
                            if(ingredients.ingredient.toLowerCase().includes(this.input)) this.results.push(recipe);
                            // console.log(ingredients.ingredient);
                        });
                    });
                    INGREDIENTS_SUGGESTIONS.classList.add("show");
                    break;
                case "appareils":
                    this.recipes.forEach(recipe=> {
                        if(recipe.appliance.toLocaleLowerCase().includes(this.input)) this.results.push(recipe);
                    });
                    APPAREILS_SUGGESTIONS.classList.add("show");
                    break;
                case "ustensiles":
                    console.log(this.recipes);
                    this.recipes.forEach(recipe=> {
                        console.log(recipe.ustensils)
                        recipe.ustensils.forEach(ustensil => {
                            if(ustensil.toLowerCase().includes(this.input)) this.results.push(recipe);
                        });
                    });
                    USTENSILES_SUGGESTIONS.classList.add("show");
                    break;
                default:
                    console.log("problème de dropdown input")
                    break;
                }
            this.dropdownResearch(this.results, "dropdown", type, this.input);
        }else{
            INGREDIENTS_SUGGESTIONS.classList.remove("show");
            APPAREILS_SUGGESTIONS.classList.remove("show");
            USTENSILES_SUGGESTIONS.classList.remove("show");
        }
        

    }

    dropdownResearch(results, typeOfResult, type, value){
            // ces tableaux seraient peut-être à mettre dans une nouvelle classe pour être aussi utiliser sans la recherche...
            // création d'un tableau d'ingrédients en fonction des résultats
            let ingredientsArray= [];
            results.forEach(result=> result.ingredients.forEach(ingredient=> ingredientsArray.push(ingredient.ingredient)));
            // console.log(ingredientsArray);
            ingredientsArray= Array.from(new Set(ingredientsArray));
            if(type === "ingredients"){
                console.log(value);
                ingredientsArray= ingredientsArray.filter(ingredient => ingredient.toLowerCase().includes(value));
            }
            
            //création d'un tableau d'appareils
            let appareilsArray= [];
            results.forEach(result=> appareilsArray.push(result.appliance));            
            appareilsArray= Array.from(new Set(appareilsArray));
            // console.log(appareilsArray);
            if(type === "appareils"){
                appareilsArray= appareilsArray.filter(appareil => appareil.toLowerCase().includes(value));
            }

            //création d'un tableau d'ustensiles
            let ustensilesArray= [];
            results.forEach(result=> result.ustensils.forEach(ustensile => ustensilesArray.push(ustensile)));
            ustensilesArray= Array.from(new Set(ustensilesArray));
            // console.log(ustensilesArray);
            if(type === "ustensiles"){
                ustensilesArray= ustensilesArray.filter(appareil => appareil.toLowerCase().includes(value));
            }
    
            //affichage des recettes
            if(typeOfResult === "input" || typeOfResult === "dropdown" || !typeOfResult) this.display.displayRecipes(results);

            const events= new EventsManager();
            events.onClickSuggestion(this.display.dropDownInit(ingredientsArray, appareilsArray, ustensilesArray), results, typeOfResult);
            
    }
}