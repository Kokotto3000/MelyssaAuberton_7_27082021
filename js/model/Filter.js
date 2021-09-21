import { recipes } from "../data/recipes.js";
import Display from "./Display.js";
import { RECIPE_CARDS } from "./globals.js";
import Search from "./Search.js";

export default class Filter{
    constructor(results, target, suggestion, array){
        this.recipes= recipes;
        this.results= results;
        this.array= array;
        // console.log(this.results);
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
                console.log("no type of filter");
        }
    }

    filterByIngredients(ingredient){
        // const filteredResults= [];
        // this.results.forEach(result=> {
        //     result.ingredients.forEach(ingredients => {
        //         if(ingredients.ingredient.toLowerCase() === ingredient.toLowerCase()) filteredResults.push(result);
        //     });
        // });
        RECIPE_CARDS.innerHTML= "";
        const filteredResults= this.results.filter(result => result.ingredients.includes(ingredient));
        console.log(filteredResults);

        const search= new Search(this.array, filteredResults);
        // search.dropdownResearch(filteredResults);
        console.log(this.results);

        for(const result of filteredResults){
            const recipe= this.recipes.find(recipe => recipe.id === result.id);
            console.log(recipe);
            this.display.displayRecipes(recipe);
        }
    }

    filterByAppareils(appareil){
        const filteredResults= this.results.filter(result => result.appareils.includes(appareil));
        const search= new Search(this.array, filteredResults);
        // search.dropdownResearch(filteredResults);
        RECIPE_CARDS.innerHTML= "";
        for(const result of filteredResults){
            const recipe= this.recipes.find(recipe => recipe.id === result.id);
            console.log(recipe);
            this.display.displayRecipes(recipe);
        }
    }

    filterByUstensiles(ustensile){
        // const filteredResults= [];
        // this.results.forEach(result=> {
        //     result.ustensils.forEach(ustensil => {
        //         if(ustensil.toLowerCase() === ustensile.toLowerCase()) filteredResults.push(result);
        //     });
        // });
        // const search= new Search();
        // search.dropdownResearch(filteredResults);

        const filteredResults= this.results.filter(result => result.ustensiles.includes(ustensile));
        const search= new Search(this.array, filteredResults);
        // search.dropdownResearch();
        RECIPE_CARDS.innerHTML= "";
        for(const result of filteredResults){
            const recipe= this.recipes.find(recipe => recipe.id === result.id);
            console.log(recipe);
            this.display.displayRecipes(recipe);
        }
    }
}