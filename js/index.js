import Arrays from "./model/Arrays.js";
import EventsManager from "./model/EventsManager.js";

// l'idée du nouvel algo serait de se servir un maximum des boucles "natives" et de générer de base des tableaux pour accélérer chaque recherche, surtout la barre principale

const arrays= new Arrays();
// console.log(arrays.navigationArrayGenerator());
// console.log(arrays.dropdownArrayGenerator());
const events= new EventsManager(arrays.navigationArrayGenerator());
events.initResearch();