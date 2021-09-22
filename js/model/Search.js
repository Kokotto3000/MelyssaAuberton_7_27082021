import { recipes } from "../data/recipes.js";
import Display from "./Display.js";
import EventsManager from "./EventsManager.js";
import { DROPDOWN_INPUTS, INGREDIENTS_SUGGESTIONS, RECIPE_CARDS } from "./globals.js";

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
            // console.log(value);
            // console.log(array);
            for(const recipe of this.array){
                // console.log(recipe.id);
                if(recipe.name.includes(this.input) || recipe.description.includes(this.input) || recipe.description.includes(this.input)){
                    this.results.push(recipe);
                    const recipeIndex= this.array.indexOf(recipe);
                    // console.log(this.recipes[recipeIndex]);
                    this.display.displayRecipes(this.recipes[recipeIndex]);
                    
                }  
            }

            // console.log(this.results);

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

    // dropdownInputResearch(type, value){

    dropdownInputResearch(results, ingredients, appareils, ustensiles){
        // console.log("input");

        this.ingredientsArray= ingredients;
        this.appareilsArray= appareils;
        this.ustensilesArray= ustensiles;

        // console.log(results)
        for(const input of this.dropdownInputs){
            input.addEventListener("input", ()=>{
                // const filter= new Filter(this.array, input.attributes.target.value, input.value.toLowerCase(), this.array);
                // this.dropdownInputResearch(results, input.attributes.target.value, input.value);
                console.log(input.value);

                if(this.checkMessage.test(input.value.trim())){

                    this.suggestions= [];
            
                    this.input= input.value.toLowerCase();
                    // this.results= [];
                    switch(input.attributes.target.value){
                        case "ingredient":

                            this.ingredientsArray= this.ingredientsArray.filter(ingredient => ingredient.toLowerCase().includes(this.input));
                            this.suggestions= this.display.dropDownInit(this.ingredientsArray, appareils, ustensiles);
                            
                        // console.log(INGREDIENTS_SUGGESTIONS);
                        // RECIPE_CARDS.innerHTML= "";


                        // for(const recipe of results){
                        //     // console.log(recipe.ingredients);
                        //     for(const ingredient of recipe.ingredients){
                        //         if(ingredient.includes(this.input)) this.results.push(recipe);                            
                        //     }
                        //     // const recipeIndex= this.array.indexOf(recipe);
                        //     // this.display.displayRecipes(this.recipes[recipeIndex]);
                        // }
                        
                        // this.recipes.forEach(recipe=> {
                        //     recipe.ingredients.forEach(ingredients => {
                        //         if(ingredients.ingredient.toLowerCase().includes(this.input)) this.results.push(recipe);
                                
                        //     });
                        // });
                        // console.log(this.results);
                        
                        break;
                    case "appareil":
                        this.appareilsArray= this.appareilsArray.filter(appareil => appareil.toLowerCase().includes(this.input));
                        this.suggestions= this.display.dropDownInit(ingredients, this.appareilsArray, ustensiles);
                        // this.suggestions= this.display.dropDownInit(ingredients, this.appareilsArray, ustensiles);
                        // return this.suggestions;
                        // RECIPE_CARDS.innerHTML= "";
                        // for(const recipe of results){
                        //     // console.log(recipe.appareils);
                        //     if(recipe.appareils.includes(this.input)) this.results.push(recipe);
                        //     // const recipeIndex= this.array.indexOf(recipe);
                        //     // this.display.displayRecipes(this.recipes[recipeIndex]);
                        // }
                        
                        // this.recipes.forEach(recipe=> {
                        //     if(recipe.appliance.toLocaleLowerCase().includes(this.input)) this.results.push(recipe);
                        // });
                        
                        break;
                    case "ustensile":

                        this.ustensilesArray= this.ustensilesArray.filter(ustensile => ustensile.toLowerCase().includes(this.input));
                        this.suggestions= this.display.dropDownInit(ingredients, appareils, this.ustensilesArray);
                        
                        // RECIPE_CARDS.innerHTML= "";
                        // for(const recipe of results){
                        //     // console.log(recipe.ingredients);
                        //     for(const ustensile of recipe.ustensiles){
                        //         if(ustensile.includes(this.input)) this.results.push(recipe);                            
                        //     }
                        //     // this.results= Array.from(new Set(this.results));
                        //     // const recipeIndex= this.array.indexOf(recipe);
                        //     // this.display.displayRecipes(this.recipes[recipeIndex]);
                        // }
                        
                        // this.recipes.forEach(recipe=> {
                            
                        //     recipe.ustensils.forEach(ustensil => {
                        //         if(ustensil.toLowerCase().includes(this.input)) this.results.push(recipe);
                        //     });
                        // });
                        break;
                    default:
                        console.log("problème de dropdown input");
                        break;
                    }

                    const events= new EventsManager(this.array);
                    // events.onInputDropdown(results);
                    // const suggestions= this.display.dropDownInit(this.ingredientsArray, this.appareilsArray, this.ustensilesArray);
                    // events.initResearch(results);
                    events.onClickSuggestion(this.suggestions, results);
                
                }
                else{
                    
                    
                    const events= new EventsManager(results);
                    // // events.onInputDropdown(results);
                    const suggestions= this.display.dropDownInit(ingredients, appareils, ustensiles);
                    // // events.initResearch(results);
                    events.onClickSuggestion(suggestions, results);
                    // this.dropdownInputResearch(results, ingredients, appareils, ustensiles)
                }

            });    
        }
    }    
        // if(this.checkMessage.test(value.trim())){
            
        //     this.input= value.toLowerCase();
        //     this.results= [];
        //     switch(type){
        //         case "ingredient":

        //             // console.log(INGREDIENTS_SUGGESTIONS);
        //             // RECIPE_CARDS.innerHTML= "";
        //             for(const recipe of results){
        //                 // console.log(recipe.ingredients);
        //                 for(const ingredient of recipe.ingredients){
        //                     if(ingredient.includes(this.input)) this.results.push(recipe);                            
        //                 }
        //                 // const recipeIndex= this.array.indexOf(recipe);
        //                 // this.display.displayRecipes(this.recipes[recipeIndex]);
        //             }
                    
        //             // this.recipes.forEach(recipe=> {
        //             //     recipe.ingredients.forEach(ingredients => {
        //             //         if(ingredients.ingredient.toLowerCase().includes(this.input)) this.results.push(recipe);
                            
        //             //     });
        //             // });
        //             console.log(this.results);
                    
        //             break;
        //         case "appareil":
        //             // RECIPE_CARDS.innerHTML= "";
        //             for(const recipe of results){
        //                 // console.log(recipe.appareils);
        //                 if(recipe.appareils.includes(this.input)) this.results.push(recipe);
        //                 // const recipeIndex= this.array.indexOf(recipe);
        //                 // this.display.displayRecipes(this.recipes[recipeIndex]);
        //             }
                    
        //             // this.recipes.forEach(recipe=> {
        //             //     if(recipe.appliance.toLocaleLowerCase().includes(this.input)) this.results.push(recipe);
        //             // });
                    
        //             break;
        //         case "ustensile":
        //             // RECIPE_CARDS.innerHTML= "";
        //             for(const recipe of results){
        //                 // console.log(recipe.ingredients);
        //                 for(const ustensile of recipe.ustensiles){
        //                     if(ustensile.includes(this.input)) this.results.push(recipe);                            
        //                 }
        //                 // this.results= Array.from(new Set(this.results));
        //                 // const recipeIndex= this.array.indexOf(recipe);
        //                 // this.display.displayRecipes(this.recipes[recipeIndex]);
        //             }
                    
        //             // this.recipes.forEach(recipe=> {
                        
        //             //     recipe.ustensils.forEach(ustensil => {
        //             //         if(ustensil.toLowerCase().includes(this.input)) this.results.push(recipe);
        //             //     });
        //             // });
        //             break;
        //         default:
        //             console.log("problème de dropdown input");
        //             break;
        //         }

        //         if(this.results.length <= 0){
                    
        //             //mettre ce message dans display pour le réutiliser avec les autres inputs
        //             RECIPE_CARDS.innerHTML= `<p>Aucune recette ne correspond à votre critère. Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p>`;
        //         }else{
        //             this.dropdownResearch(this.results, type, this.input);
        //         }
            
        // }else{
            
        //     this.dropdownResearch(this.array);
        //     // this.display.displayRecipes();
        // }

    dropdownResearch(results, init){
        // console.log(results)
        // console.log(results);
        // console.log(typeOfResult);
        // ces tableaux seraient peut-être à mettre dans une nouvelle classe pour être aussi utiliser sans la recherche...
        // création d'un tableau d'ingrédients en fonction des résultats
        let ingredientsArray= [];
        for(const result of results){
            for(const ingredient of result.ingredients){
                ingredientsArray.push(ingredient);
                ingredientsArray= Array.from(new Set(ingredientsArray));
            }
            
        }
        // if(type === "ingredient"){
            
        //     ingredientsArray= ingredientsArray.filter(ingredient => ingredient.toLowerCase().includes(value));
        // }
        // console.log(ingredientsArray);

        let appareilsArray= [];
        for(const result of results){
            appareilsArray.push(result.appareils);
            appareilsArray= Array.from(new Set(appareilsArray));
        }
        // if(type === "appareil"){
        //     appareilsArray= appareilsArray.filter(appareil => appareil.toLowerCase().includes(value));
        // }
        // console.log(appareilsArray);

        let ustensilesArray= [];
        for(const result of results){
            for(const ustensile of result.ustensiles){
                ustensilesArray.push(ustensile);
                ustensilesArray= Array.from(new Set(ustensilesArray));
            }    
        }
        // if(type === "ustensile"){
        //     ustensilesArray= ustensilesArray.filter(appareil => appareil.toLowerCase().includes(value));
        // }
        // console.log(ustensilesArray);

        
    
    //         //affichage des recettes
    //         if(typeOfResult === "input" || typeOfResult === "dropdown" || !typeOfResult) this.display.displayRecipes(results);

    
            const events= new EventsManager(this.array);
            // events.onInputDropdown(results);
            const suggestions= this.display.dropDownInit(ingredientsArray, appareilsArray, ustensilesArray);
            // events.initResearch(results);
            events.onClickSuggestion(suggestions, results);
            this.dropdownInputResearch(results, ingredientsArray, appareilsArray, ustensilesArray);
    }
}