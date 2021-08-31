import { NAV_SEARCH } from "./globals.js";
import Search from "./Search.js";

export default class EventsManager{
    constructor(){
        this.search= new Search();
        this.navigationInput= NAV_SEARCH.elements["nav-search"];
    }

    init(){
        this.navigationInput.addEventListener('input', ()=>{
            this.search.navigationResearch();
        });
    }
}