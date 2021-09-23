import { recipes } from "../data/recipes.js";
import Display from "./Display.js";
import { RECIPE_CARDS } from "./globals.js";
import Search from "./Search.js";

export default class Filter{
    constructor(results, target, suggestion, array){
        this.recipes= recipes;
        this.results= results;
        this.array= array;
        this.display= new Display();

        switch(target){
            case "ingredient" :
                this.filterByIngredients(suggestion);
                break;
            case "appareil" :
                this.filterByAppareils(suggestion);
                break;
            case "ustensile" :
                this.filterByUstensiles(suggestion);
                break;
            default :
                console.log("no type of filter, tindin");
        }
    }

    filterByIngredients(ingredient){
        
        RECIPE_CARDS.innerHTML= "";
        const filteredResults= this.results.filter(result => result.ingredients.includes(ingredient));

        const search= new Search(this.array, filteredResults);

        for(const result of filteredResults){
            const recipe= this.recipes.find(recipe => recipe.id === result.id);
            
            this.display.displayRecipes(recipe);
        }
    }

    filterByAppareils(appareil){
        const filteredResults= this.results.filter(result => result.appareils.includes(appareil));
        const search= new Search(this.array, filteredResults);
        RECIPE_CARDS.innerHTML= "";
        for(const result of filteredResults){
            const recipe= this.recipes.find(recipe => recipe.id === result.id);
            
            this.display.displayRecipes(recipe);
        }
    }

    filterByUstensiles(ustensile){

        const filteredResults= this.results.filter(result => result.ustensiles.includes(ustensile));
        const search= new Search(this.array, filteredResults);
        RECIPE_CARDS.innerHTML= "";
        for(const result of filteredResults){
            const recipe= this.recipes.find(recipe => recipe.id === result.id);
            
            this.display.displayRecipes(recipe);
        }
    }
}