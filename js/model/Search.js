import { recipes } from "../data/recipes.js";
import Display from "./Display.js";
import EventsManager from "./EventsManager.js";
import { DROPDOWN_INPUTS, RECIPE_CARDS } from "./globals.js";

// Classe de recherche principale de l'application

export default class Search{
    constructor(array, filteredArray){
        this.recipes= recipes;
        //le tableau de base
        this.array= array;
        //le tableau retourné dès que l'on tape 3 lettres dans l'input principal pour accélérer les recherches sur les lettres tapées ensuite
        this.first3LettersResults= [];
        // la regex pour vérifier qu'au moins 3 lettres ont été tapées
        this.checkMessage= /^[\s\S]{3,}/;
        //la classe qui gère les affichages
        this.display= new Display();
        // this.dropdownInputs= DROPDOWN_INPUTS;

        //on envoie toujours le tableau de base à ce constructeur, mais on peut aussi lui envoyer un tableau filtré
        //en fonction de l'envoi on lance la méthode qui cherche les suggestions des dropdowns à afficher avec l'un ou l'autre tableau
        //cette méthode se lance automatiquement à l'instanciation de la classe parce qu'elle est appelé du constructeur
        if(filteredArray) this.dropdownResearch(filteredArray);
        else this.dropdownResearch(this.array);              
    }

    //méthode de recherche sur la barre principale
    navigationResearch(value){
        //vérifie si au moins 3 lettres ont été entrées dans l'input
        if(this.checkMessage.test(value)){
            // efface les recettes déjà présentes
            this.display.displayRecipes();
            // const input= value.toLowerCase();

            //déclaration d'un tableau de résultats
            const results= [];

            //si l'input fait au moins 3 lettres on lance une première recherche sur tout le tableau de base pour retourner un tableau réduit avec les premiers résultats
            //cela évitera de relancer une boucle sur toutes les recettes à chaque lettres ajoutées
            if(value.length === 3){
                //boucle sur tous les résultats du tableau de base
                for(const recipe of this.array){
                    //mettre ce bloc dans une fonction où on trouvera le tableau en argument

                    //cascade de conditions qui permet d'ajouter une recette à notre tableau de résultats dès qu'il trouve un résultat qui correspond et de s'arrêter là pour passer à la recette suivante
                    //on cherche d'abord dans les noms
                    if(recipe.name.includes(value)){
                        // console.log(recipe)
                        results.push(recipe);
                        //et on affiche tout de suite la recette correspondante
                        const recipeIndex= this.array.indexOf(recipe);                    
                        this.display.displayRecipes(this.recipes[recipeIndex]);
                        // break;
                    }else{
                        //si on n'a pas trouvé dans les noms, on cherche dans les descriptions
                        if(recipe.description.includes(value)){
                            // console.log(recipe)
                            results.push(recipe);
                            const recipeIndex= this.array.indexOf(recipe);                    
                            this.display.displayRecipes(this.recipes[recipeIndex]); 
                            // break;
                        }else{
                            // et si on n'a toujours pas trouvé dans la description, on cherche dans les ingrédients
                            for(const ingredient of recipe.ingredients){
                                if(ingredient.includes(value)){
                                    // console.log(recipe)
                                    results.push(recipe);
                                    const recipeIndex= this.array.indexOf(recipe);                    
                                    this.display.displayRecipes(this.recipes[recipeIndex]);
                                    break;
                                }
                            }
                        }
                    }
                }

                //first3LettersResults devient le tableau de résultats;
                this.first3LettersResults= results;

            }else{
                //au delà de 3 lettres, on trie sur le tableau créé aux 3 premières lettres
                for(const recipe of this.first3LettersResults){
                    
                    if(recipe.name.includes(value)){
                        // console.log(recipe)
                        results.push(recipe);
                        const recipeIndex= this.array.indexOf(recipe);                    
                        this.display.displayRecipes(this.recipes[recipeIndex]);
                        // break;
                    }else{
                        
                        if(recipe.description.includes(value)){
                            // console.log(recipe)
                            results.push(recipe);
                            const recipeIndex= this.array.indexOf(recipe);                    
                            this.display.displayRecipes(this.recipes[recipeIndex]); 
                            // break;
                        }else{
                                                
                            for(const ingredient of recipe.ingredients){
                                if(ingredient.includes(value)){
                                    // console.log(recipe)
                                    results.push(recipe);
                                    const recipeIndex= this.array.indexOf(recipe);                    
                                    this.display.displayRecipes(this.recipes[recipeIndex]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            //s'il n'y a aucun résultats, on affiche un message
            // à mettre dans display...
            if(results.length <= 0){
                RECIPE_CARDS.innerHTML= `<p>Aucune recette ne correspond à votre critère. Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p>`;
            }else{
                //sinon on lance la recherche qui crée les listes de suggestions dans les dropdowns avec ce tableau de résultats
                this.dropdownResearch(results);
                
            }
            
        //et si moins de 3 lettres ont entrées dans l'input, on reset (le tableau de résultats, les suggestions du dropdown avec le tableau de base, et )
        }else{
            this.first3LettersResults= [];
            this.dropdownResearch(this.array);
            // n'affiche aucune recette
            this.display.displayRecipes();
        }
    }

    //méthode qui cherche toutes les suggestions à afficher dans les dropdowns en évitant les doublons
    dropdownResearch(results){
        
        //crée un tableau d'ingrédients à partir des résultats envoyés
        let ingredientsArray= [];
        for(const result of results){
            for(const ingredient of result.ingredients){
                //ajoute tous les ingrédients dans un tableau
                ingredientsArray.push(ingredient);
                //retire tous les doublons du tableau et retourne le tableau "filtré"
                ingredientsArray= Array.from(new Set(ingredientsArray));
            }
            
        }

        //même méthode pour les appareils
        let appareilsArray= [];
        for(const result of results){
            appareilsArray.push(result.appareils);
            appareilsArray= Array.from(new Set(appareilsArray));
        }

        //et pour les ustensiles
        let ustensilesArray= [];
        for(const result of results){
            for(const ustensile of result.ustensiles){
                ustensilesArray.push(ustensile);
                ustensilesArray= Array.from(new Set(ustensilesArray));
            }    
        }
    
        //on instancie eventsManager pour pouvoir appeler la méthode sur les clics des suggestions créées et les inputs des dropdowns
        const events= new EventsManager(this.array);
        
        //on appelle la méthode displayDropdowns qui crée l'affichage des dropdowns et retourne un tableau des suggestions
        const suggestions= this.display.displayDropdowns(ingredientsArray, appareilsArray, ustensilesArray);
        
        events.onClickSuggestion(suggestions, results);
        events.onInputDropdowns(results, ingredientsArray, appareilsArray, ustensilesArray, this.array);
    }
}