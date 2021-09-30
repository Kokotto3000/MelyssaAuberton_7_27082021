import { 
    NAV_SEARCH, 
    SEARCH_WORLDS,
    DROPDOWN_INPUTS
} from "./globals";
import Search from "./Search";
import Display from "./Display";
import FilterByClick from "./FilterByClick";
import FilterByInput from "./FilterByInput";

//initialise et gère les events sur l'application

export default class EventsManager{
    constructor(array){
        // la classe display gère tout ce qui concerne l'affichage
        this.display= new Display();
        this.navigationInput= NAV_SEARCH;
        this.dropdownInputs= DROPDOWN_INPUTS;
        //le tableau de résultats envoyé à l'application à son instanciation
        this.array= array;        
    }

    init(){
        //initialise la préparation des dropdowns pour la recherche sur les dropdowns
        const search= new Search(this.array);

        //initialise la recherche sur l'input de la barre principale
        this.navigationInput.addEventListener('input', ()=>{
            search.navigationResearch(this.navigationInput.value.trim().toLowerCase());
        });
    }

    //methode pour les events sur les listes des dropdowns
    onClickSuggestion(suggestions, results){
        //récupère tous les tags déjà cochés pour éviter les doublons
        const SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
        //on place les noms des tags dans un tableau pour comparer
        const buttonsName= [];
        for(const button of SEARCH_WORLDS_BUTTONS){
            buttonsName.push(button.textContent);
        }   
        
        //boucle sur tous les "boutons" suggestions envoyés depuis la recherche
        suggestions.forEach(suggestion => {
            //création de l'event au click sur chacun de ces boutons
            suggestion.addEventListener("click", ()=> {
                //si des tags existent, on vérifie que le text de la suggestion n'est pas présent dans le tableau des tags et on arrête, sinon on continue
                if(SEARCH_WORLDS_BUTTONS.length > 0){
                    if(buttonsName.includes(suggestion.textContent)) return;                    
                }
                // on affiche le tags dans la zone réservée aux tags en appelant la méthode display tags et en lui envoyant les arguments nécessaires    
                this.display.displayTags(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value);

                // on instancie la classe filterByClick qui va trier les résultats en focntion du mot cliqué
                const filter= new FilterByClick(results, suggestion.attributes.target.value, suggestion.textContent, this.array);

                // this.dropdownInputs.forEach(input=> input.value= "");
                // this.navigationInput.value= "";

                //on déclenche la méthode qui va réagir au clic sur un tag créés plus haut
                this.onClickTags();
                
            });
        });   
    }

    // methode qui lance les evènements sur les inputs des dropdowns
    onInputDropdowns(results, ingredients, appareils, ustensiles, array){

        for(const input of this.dropdownInputs){
            input.addEventListener("input", ()=> {
                //on instancie la classe qui va filtrer les suggestions des dropdowns en fonction des lettres entrées dans l'input
                const filter= new FilterByInput(results, ingredients, appareils, ustensiles, input.attributes.target.value, input.value.trim().toLowerCase(), array);
                // this.onClickTags();
            })
            
        }
    }

    //méthode qui crée les events sur les boutons tags pour les supprimer et relancer un filtre ou reset en fonction du nombre de tags restants
    onClickTags(){
        //on récupère tous les boutons tags du DOM
        let SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");

        SEARCH_WORLDS_BUTTONS.forEach(button=> {
            button.addEventListener("click", ()=> {
                //à chaque clic, on commence par retirer le boutons du DOM
                SEARCH_WORLDS.removeChild(button);
                //on relance la recherche sur les tags
                SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
                //s'il reste des tags, on lance une boucle qui filtre les résultats par tags restants
                if(SEARCH_WORLDS_BUTTONS.length > 0){
                    SEARCH_WORLDS_BUTTONS.forEach(button=> {
                    const filter= new FilterByClick(this.array, button.attributes.target.value, button.textContent, this.array);
                    });
                }else{
                    // sinon on réinitialise la recherche de base et on efface les recettes
                    const search= new Search(this.array);
                    this.display.displayRecipes();                                        
                }
            });            
        });
    }
}