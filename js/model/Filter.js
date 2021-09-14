import Display from "./Display.js";
import Search from "./Search.js";

export default class Filter{
    constructor(results, target, suggestion){
        this.results= results;
        this.display= new Display();
        // this.search= new Search();
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
        // console.log(ingredient);
        const filteredResults= [];
        this.results.forEach(result=> {
            result.ingredients.forEach(ingredients => {
                // console.log(ingredients.ingredient);
                if(ingredients.ingredient.toLowerCase() === ingredient.toLowerCase()) filteredResults.push(result);
            });
        });
        // console.log(filteredResults);

        const search= new Search();
        search.dropdownResearch(filteredResults);
    }

    filterByAppareils(appareil){
        // console.log(appareil);
        const filteredResults= this.results.filter(result => result.appliance.includes(appareil));
        // console.log(this.filteredResults);
        const search= new Search();
        search.dropdownResearch(filteredResults);
    }

    filterByUstensiles(ustensile){
        // console.log(ustensile);
        const filteredResults= [];
        this.results.forEach(result=> {
            result.ustensils.forEach(ustensil => {
                if(ustensil.toLowerCase() === ustensile.toLowerCase()) filteredResults.push(result);
            });
        });
        const search= new Search();
        search.dropdownResearch(filteredResults);
    }
}