import { recipes } from "../data/recipes.js";
import { NAV_SEARCH } from "./globals.js";
import Display from "./Display.js";
import EventsManager from "./EventsManager.js";

export default class Search{
    constructor(){
        this.recipes= recipes;
        this.checkMessage= /^[\s\S]{3,}/;
        this.navigationInput= NAV_SEARCH.elements["nav-search"];
        this.display= new Display();        
    }

    navigationResearch(){
        
        if(this.checkMessage.test(this.navigationInput.value.trim())){
            //doit chercher dans les name, ingredients, description et non pas transmettre à la div que j'avais faite pas aux tags
            
            this.input= this.navigationInput.value.toLowerCase();

            this.results= []
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

    dropdownResearch(results, typeOfResult){
            // ces tableaux seraient peut-être à mettre dans une nouvelle classe pour être aussi utiliser sans la recherche...
            // création d'un tableau d'ingrédients en fonction des résultats
            let ingredientsArray= [];
            results.forEach(result=> result.ingredients.forEach(ingredient=> ingredientsArray.push(ingredient.ingredient)));
            // console.log(ingredientsArray);
            ingredientsArray= Array.from(new Set(ingredientsArray));
            // console.log(ingredientsArray);

            //création d'un tableau d'appareils
            let appareilsArray= [];
            results.forEach(result=> appareilsArray.push(result.appliance));            
            appareilsArray= Array.from(new Set(appareilsArray));
            // console.log(appareilsArray);

            //création d'un tableau d'ustensiles
            let ustensilesArray= [];
            results.forEach(result=> result.ustensils.forEach(ustensile => ustensilesArray.push(ustensile)));
            ustensilesArray= Array.from(new Set(ustensilesArray));
            // console.log(ustensilesArray);
    
            //affichage des recettes
            if(typeOfResult === "input" || !typeOfResult) this.display.displayRecipes(results);

            const events= new EventsManager();
            events.onClickSuggestion(this.display.dropDownInit(ingredientsArray, appareilsArray, ustensilesArray), results, typeOfResult);
            
    }
}