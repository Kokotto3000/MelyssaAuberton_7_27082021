// import { recipes } from "../data/recipes";
import Display from "./Display";
import EventsManager from "./EventsManager";

// Classe de recherche principale de l'application

export default class Search{
    constructor(array, filteredArray){
        // this.recipes= recipes;
        //le tableau de base
        this.array= array;
        //le tableau retourné dès que l'on tape 3 lettres dans l'input principal pour accélérer les recherches sur les lettres tapées ensuite
        this.first3LettersResults= [];
        // la regex pour vérifier qu'au moins 3 lettres ont été tapées
        this.checkMessage= /^[\s\S]{3,}/;
        //la classe qui gère les affichages
        this.display= new Display();

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
                        
                        results.push(recipe);
                        //et on affiche tout de suite la recette correspondante            
                        this.display.displayRecipes(recipe.recipe);
                        
                    }else{
                        //si on n'a pas trouvé dans les noms, on cherche dans les descriptions
                        if(recipe.description.includes(value)){
                            
                            results.push(recipe);                
                            this.display.displayRecipes(recipe.recipe); 
                            
                        }else{
                            // et si on n'a toujours pas trouvé dans la description, on cherche dans les ingrédients
                            for(const ingredient of recipe.ingredients){
                                if(ingredient.includes(value)){
                                    
                                    results.push(recipe);                
                                    this.display.displayRecipes(recipe.recipe);
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
                //on vérifie si un mot n'a pas été rentré d'un bloc (copier coller, suggestions...), dans ce cas, le tableau des premiers résultats sera vide
                //s'il n'est pas vide
                if(this.first3LettersResults.length !== 0){
                    for(const recipe of this.first3LettersResults){
                    
                        if(recipe.name.includes(value)){
                            
                            results.push(recipe);                   
                            this.display.displayRecipes(recipe.recipe);
                            
                        }else{
                            
                            if(recipe.description.includes(value)){
                                
                                results.push(recipe);                    
                                this.display.displayRecipes(recipe.recipe); 
                                
                            }else{
                                                    
                                for(const ingredient of recipe.ingredients){
                                    if(ingredient.includes(value)){
                                        
                                        results.push(recipe);                 
                                        this.display.displayRecipes(recipe.recipe);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }else{
                    //s'il est vide on lance une recherche comme si c'était les 3 premières lettres
                    for(const recipe of this.array){
                        
                        if(recipe.name.includes(value)){
                            
                            results.push(recipe);
                                      
                            this.display.displayRecipes(recipe.recipe);
                            
                        }else{
                            
                            if(recipe.description.includes(value)){
                                
                                results.push(recipe);                
                                this.display.displayRecipes(recipe.recipe); 
                                
                            }else{
                                
                                for(const ingredient of recipe.ingredients){
                                    if(ingredient.includes(value)){
                                        
                                        results.push(recipe);                
                                        this.display.displayRecipes(recipe.recipe);
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    this.first3LettersResults= results;

                }
                
            }

            //s'il n'y a aucun résultats, on affiche un message
            //pour proposer des suggestions aléatoires et dynamiques dans le message, on tire 2 nombres au hasard qui désigneront des résultats
            // à mettre dans display...
            if(results.length <= 0){
                //ici, on va non seulement afficher un message d'erreur mais aussi initier une recherche si l'utilisateur clique sur l'une des propositions
                const events= new EventsManager(this.array);
                const randomNumbers= [];
                for(let i= 0; i<2; i++) {
                    randomNumbers.push(Math.floor(Math.random()*this.array.length));
                }
                //on envoie les recettes avec les index aléatoires au display pour l'affichage
                const links= this.display.displayErrorMessage(this.array[randomNumbers[0]].recipe, this.array[randomNumbers[1]].recipe);
                events.onClickErrorLinks(links);
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
                
            }
            
        }
        //retire tous les doublons du tableau et retourne le tableau "filtré"
        ingredientsArray= Array.from(new Set(ingredientsArray));
        //trie le tableau par ordre alphabétique, les listes seront affichées par ordre alphabétique
        ingredientsArray.sort();

        //même méthode pour les appareils
        let appareilsArray= [];
        for(const result of results){
            appareilsArray.push(result.appareils);
           
        }
        appareilsArray= Array.from(new Set(appareilsArray));
        appareilsArray.sort();

        //et pour les ustensiles
        let ustensilesArray= [];
        for(const result of results){
            for(const ustensile of result.ustensiles){
                ustensilesArray.push(ustensile);
                
            }    
        }
        ustensilesArray= Array.from(new Set(ustensilesArray));
        ustensilesArray.sort();
    
        //on instancie eventsManager pour pouvoir appeler la méthode sur les clics des suggestions créées et les inputs des dropdowns
        const events= new EventsManager(this.array);
        
        //on appelle la méthode displayDropdowns qui crée l'affichage des dropdowns et retourne un tableau des suggestions
        const suggestions= this.display.displayDropdowns(ingredientsArray, appareilsArray, ustensilesArray);
        
        events.onClickSuggestion(suggestions, results);
        events.onInputDropdowns(results, ingredientsArray, appareilsArray, ustensilesArray, this.array);
    }
}