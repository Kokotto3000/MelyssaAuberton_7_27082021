import { recipes } from "../data/recipes.js";
import Display from "./Display.js";
import EventsManager from "./EventsManager.js";
import { DROPDOWN_INPUTS, RECIPE_CARDS } from "./globals.js";

export default class Search{
    constructor(array, filteredArray){
        this.recipes= recipes;
        this.array= array;
        this.checkMessage= /^[\s\S]{3,}/;
        this.display= new Display();
        this.dropdownInputs= DROPDOWN_INPUTS;
        if(filteredArray) this.dropdownResearch(filteredArray);
        else this.dropdownResearch(this.array);              
    }

    navigationResearch(value){
        
        if(this.checkMessage.test(value.trim())){
            //doit chercher dans les name, ingredients, description et non pas transmettre à la div que j'avais faite pas aux tags
            RECIPE_CARDS.innerHTML= "";
            this.input= value.toLowerCase();

            this.results= [];

            for(const recipe of this.array){
                
                if(recipe.name.includes(this.input) || recipe.description.includes(this.input) || recipe.description.includes(this.input)){
                    this.results.push(recipe);
                    const recipeIndex= this.array.indexOf(recipe);
                    
                    this.display.displayRecipes(this.recipes[recipeIndex]);
                    
                }  
            }

            if(this.results.length <= 0){
                RECIPE_CARDS.innerHTML= `<p>Aucune recette ne correspond à votre critère. Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p>`;
            }else{
                this.dropdownResearch(this.results);
            }
            
        }else{
            this.dropdownResearch(this.array);
            this.display.displayRecipes();
        }
    }

    dropdownResearch(results, init){
        
        let ingredientsArray= [];
        for(const result of results){
            for(const ingredient of result.ingredients){
                ingredientsArray.push(ingredient);
                ingredientsArray= Array.from(new Set(ingredientsArray));
            }
            
        }

        let appareilsArray= [];
        for(const result of results){
            appareilsArray.push(result.appareils);
            appareilsArray= Array.from(new Set(appareilsArray));
        }

        let ustensilesArray= [];
        for(const result of results){
            for(const ustensile of result.ustensiles){
                ustensilesArray.push(ustensile);
                ustensilesArray= Array.from(new Set(ustensilesArray));
            }    
        }
    
        const events= new EventsManager(this.array);
        
        const suggestions= this.display.dropDownInit(ingredientsArray, appareilsArray, ustensilesArray);
        
        events.onClickSuggestion(suggestions, results);
        events.onInputDropdowns(results, ingredientsArray, appareilsArray, ustensilesArray, this.array);
    }
}