import EventsManager from "./model/EventsManager.js";
import { recipes } from "./data/recipes.js";
import { dropDownInit } from "./model/globals.js";


// il faut que tous les ingrédients... soient affichés dans le dropdown par défaut...
//garder l'idée des fonctions à appeler au départ dans d'éventuelles classes type dropdown

const events= new EventsManager();
events.onClickSuggestion(dropDownInit(), recipes);