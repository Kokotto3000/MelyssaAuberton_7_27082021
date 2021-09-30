import { recipes } from "../data/recipes";
import Display from "./Display";
import Search from "./Search";

//classe qui va filtrer les résultats en fonction du clic sur les suggestions des dropdowns
export default class FilterByClick{
    constructor(results, target, suggestion, array){
        //nous avons besoin des recettes originales pour l'affichage
        this.recipes= recipes;
        //le tableau des résultats de recherche envoyé à l'instanciation de la classe
        this.results= results;
        //le tableau original
        this.array= array;
        //la classe d'affichage
        this.display= new Display();

        //appelle automatiquement la méthode de tri
        this.filter(target, suggestion);
    }

    filter(target, suggestion){
        
        // vide les recettes de l'affichage
        this.display.displayRecipes();

        let filteredResults= [];

        //en fonction de la target de la suggestion cliquée, on envoie vers la bonne méthode
        switch(target){
            case "ingredients" :
                // filtre en fonction de la valeur envoyée et retourne un nouveau tableau qui ne contient que les recettes qui contiennent le mots clé
                filteredResults= this.results.filter(result => result.ingredients.includes(suggestion));
                break;
            case "appareils" :
                filteredResults= this.results.filter(result => result.appareils.includes(suggestion));
                break;
            case "ustensiles" :
                filteredResults= this.results.filter(result => result.ustensiles.includes(suggestion));
                break;
            default :
                console.log("no type of filter");
        }

        const search= new Search(this.array, filteredResults);

        for(const result of filteredResults){
            //trouve la recette dans les datas qui correspond à l'id du tableau filtré
            const recipe= this.recipes.find(recipe => recipe.id === result.id);
            //affiche dès qu'une recette est trouvée
            this.display.displayRecipes(recipe);
        }
    }
}