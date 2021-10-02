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
        this.dropdownButtons= document.querySelectorAll(".btn-lg");
        //le tableau de résultats envoyé à l'application à son instanciation
        this.array= array;        
    }

    init(){
        //initialise la préparation des dropdowns pour la recherche sur les dropdowns
        const search= new Search(this.array);

        //initialise la recherche sur l'input de la barre principale
        this.navigationInput.addEventListener('input', ()=>{
            search.navigationResearch(this.navigationInput.value.trim().toLowerCase());
            //on efface les éventuelles tags
            SEARCH_WORLDS.innerHTML= "";
            //et les entrées dans les inputs de dropdowns
            this.dropdownInputs.forEach(input=> input.value= "");
        });

        //ajout d'eventListeners pour changer le placeholder des inputs dans les dropdowns
        //ici pour changer le placeholder au click
        this.dropdownButtons.forEach(button=> button.addEventListener("click", (e)=>{
            //évite la propagation de l'event sur le document aux boutons
            e.stopPropagation();
            if(button.classList.contains("show")){
                const input= button.querySelector("input");
                if(input.attributes.target.value === "ingredients") input.setAttribute("placeholder", "Rechercher un ingrédient");
                else if(input.attributes.target.value === "appareils") input.setAttribute("placeholder", "Rechercher un appareil");
                else input.setAttribute("placeholder", "Rechercher un ustensile");
            }else{
                const input= button.querySelector("input");
                if(input.attributes.target.value === "ingredients") input.setAttribute("placeholder", "Ingrédients");
                else if(input.attributes.target.value === "appareils") input.setAttribute("placeholder", "Appareils");
                else input.setAttribute("placeholder", "Ustensiles");                    
            }
        }));

        //ici pour changer le placeholder au click à côté du bouton
        document.addEventListener("click", ()=> {            
            this.dropdownInputs.forEach(input=> {
                if(input.attributes.target.value === "ingredients") input.setAttribute("placeholder", "Ingrédients");
                else if(input.attributes.target.value === "appareils") input.setAttribute("placeholder", "Appareil");
                else input.setAttribute("placeholder", "Ustensiles");
                input.textContent= "";
            })
        })

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

                this.dropdownInputs.forEach(input=> input.value= "");
                this.navigationInput.value= "";

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
                    let results= this.array;

                    for(let i=0; i < SEARCH_WORLDS_BUTTONS.length; i++){
                        results= new FilterByClick(results, SEARCH_WORLDS_BUTTONS[i].attributes.target.value, SEARCH_WORLDS_BUTTONS[i].textContent, this.array);
                        i++;
                    }
                    
                }else{
                    // sinon on réinitialise la recherche de base et on efface les recettes
                    const search= new Search(this.array);
                    this.display.displayRecipes();                                        
                }
            });            
        });
    }

    // évènement sur les liens du message d'erreur pour relancer une recherche sur ces mots si l'utilisateur clique dessus
    onClickErrorLinks(links){
        links.forEach(link=> link.addEventListener("click", (e)=> {
            e.preventDefault();
            //on affiche le mot choisi dans la nav principale
            this.navigationInput.value= link.innerText;
            //on lance la recherche sur ce mot comme si l'utilisateur l'avait entré lui-même
            const search= new Search(this.array);
            search.navigationResearch(this.navigationInput.value.trim().toLowerCase());
        }))
    }
}