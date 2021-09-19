import Display from "./Display.js";
import Search from "./Search.js";

export default class Filter{
    constructor(results, target, suggestion){
        this.results= results;
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
        const filteredResults= [];
        this.results.forEach(result=> {
            result.ingredients.forEach(ingredients => {
                if(ingredients.ingredient.toLowerCase() === ingredient.toLowerCase()) filteredResults.push(result);
            });
        });

        const search= new Search();
        search.dropdownResearch(filteredResults);
    }

    filterByAppareils(appareil){
        const filteredResults= this.results.filter(result => result.appliance.includes(appareil));
        const search= new Search();
        search.dropdownResearch(filteredResults);
    }

    filterByUstensiles(ustensile){
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