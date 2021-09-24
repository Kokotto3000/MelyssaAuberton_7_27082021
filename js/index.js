import Arrays from "./model/Arrays.js";
import EventsManager from "./model/EventsManager.js";

//on crée un tableau normalisé avec les datas pour faciliter les recherches sur le site à son ouverture
const arrays= new Arrays();

//on instancie la classe eventsManager qui va initialiser tous les events sur l'application et on lui passe le tableau de base en argument
const events= new EventsManager(arrays.navigationArrayGenerator());
events.init();