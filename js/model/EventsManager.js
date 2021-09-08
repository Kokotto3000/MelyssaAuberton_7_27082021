import { NAV_SEARCH } from "./globals.js";
import Search from "./Search.js";
import Display from "./Display.js";

export default class EventsManager{
    constructor(){
        this.search= new Search();
        this.display= new Display();
        this.navigationInput= NAV_SEARCH.elements["nav-search"];
    }

    init(){
        this.navigationInput.addEventListener('input', ()=>{
            this.search.navigationResearch();
        });
    }

    onClickSuggestion(suggestions){
        suggestions.forEach(suggestion => {
            suggestion.addEventListener("click", ()=> {
                // console.log(suggestion);
                this.display.displaySearchWorlds(suggestion.textContent, suggestion.classList[1]);
                // et relancer la recherche en fonction du click (filtre)
            });
        });   
    }

    //ajouter un event sur les boutons créés pour les supprimer si on reclique dessus
}