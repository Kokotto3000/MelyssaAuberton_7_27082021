//import du main.scss
import './sass/main.scss';

// Import just what we need

// import 'bootstrap/js/dist/alert';
import '../node_modules/bootstrap/js/dist/button';
// import 'bootstrap/js/dist/carousel';
import '../node_modules/bootstrap/js/dist/collapse';
import '../node_modules/bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/popover';
// import 'bootstrap/js/dist/scrollspy';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/toast';
// import 'bootstrap/js/dist/tooltip';

import Arrays from "./js/model/Arrays";
import EventsManager from "./js/model/EventsManager";

//on crée un tableau normalisé avec les datas pour faciliter les recherches sur le site à son ouverture
const arrays= new Arrays();

//on instancie la classe eventsManager qui va initialiser tous les events sur l'application et on lui passe le tableau de base en argument
const events= new EventsManager(arrays.navigationArrayGenerator());
events.init();