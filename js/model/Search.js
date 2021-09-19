import { recipes } from "../data/recipes.js";
import Display from "./Display.js";
import EventsManager from "./EventsManager.js";
import { RECIPE_CARDS } from "./globals.js";

export default class Search{
    constructor(){
        this.recipes= recipes;
        this.checkMessage= /^[\s\S]{3,}/;
        this.display= new Display();        
    }

    navigationResearch(value){

        //attention si moins de 2 caractères => reset
        
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
                           
                        });
                    }                
                }
            });

           
            if(this.results.length <= 0){                
                //mettre ce message dans display pour le réutiliser avec les autres inputs
                RECIPE_CARDS.innerHTML= `<p>Aucune recette ne correspond à votre critère. Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p>`;
            }else{
                this.dropdownResearch(this.results, "input");
            }
    
        }else{
            this.dropdownResearch(this.recipes, "reset");
            this.display.displayRecipes();
        }
    }

    dropdownInputResearch(type, value){
        if(this.checkMessage.test(value.trim())){
            this.input= value.toLowerCase();
            this.results= [];
            switch(type){
                case "ingredients":
                    
                    this.recipes.forEach(recipe=> {
                        recipe.ingredients.forEach(ingredients => {
                            if(ingredients.ingredient.toLowerCase().includes(this.input)) this.results.push(recipe);
                            
                        });
                    });
                    
                    break;
                case "appareils":
                    this.recipes.forEach(recipe=> {
                        if(recipe.appliance.toLocaleLowerCase().includes(this.input)) this.results.push(recipe);
                    });
                    
                    break;
                case "ustensiles":
                    
                    this.recipes.forEach(recipe=> {
                        
                        recipe.ustensils.forEach(ustensil => {
                            if(ustensil.toLowerCase().includes(this.input)) this.results.push(recipe);
                        });
                    });
                    break;
                default:
                    console.log("problème de dropdown input");
                    break;
                }

                if(this.results.length <= 0){
                    
                    //mettre ce message dans display pour le réutiliser avec les autres inputs
                    RECIPE_CARDS.innerHTML= `<p>Aucune recette ne correspond à votre critère. Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p>`;
                }else{
                    this.dropdownResearch(this.results, "dropdown", type, this.input);
                }
            
        }else{
            
            this.dropdownResearch(this.recipes, "reset");
            this.display.displayRecipes();
        }
    }

    dropdownResearch(results, typeOfResult, type, value){
            // ces tableaux seraient peut-être à mettre dans une nouvelle classe pour être aussi utiliser sans la recherche...
            // création d'un tableau d'ingrédients en fonction des résultats
            let ingredientsArray= [];
            results.forEach(result=> result.ingredients.forEach(ingredient=> ingredientsArray.push(ingredient.ingredient)));
            ingredientsArray= Array.from(new Set(ingredientsArray));
            if(type === "ingredients"){
                
                ingredientsArray= ingredientsArray.filter(ingredient => ingredient.toLowerCase().includes(value));
            }
            
            //création d'un tableau d'appareils
            let appareilsArray= [];
            results.forEach(result=> appareilsArray.push(result.appliance));            
            appareilsArray= Array.from(new Set(appareilsArray));
            if(type === "appareils"){
                appareilsArray= appareilsArray.filter(appareil => appareil.toLowerCase().includes(value));
            }

            //création d'un tableau d'ustensiles
            let ustensilesArray= [];
            results.forEach(result=> result.ustensils.forEach(ustensile => ustensilesArray.push(ustensile)));
            ustensilesArray= Array.from(new Set(ustensilesArray));
            if(type === "ustensiles"){
                ustensilesArray= ustensilesArray.filter(appareil => appareil.toLowerCase().includes(value));
            }
    
            //affichage des recettes
            if(typeOfResult === "input" || typeOfResult === "dropdown" || !typeOfResult) this.display.displayRecipes(results);

            const events= new EventsManager();
            events.onClickSuggestion(this.display.dropDownInit(ingredientsArray, appareilsArray, ustensilesArray), results, typeOfResult);
            
    }
}