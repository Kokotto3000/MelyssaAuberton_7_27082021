// tableau de recherche
const persons= [
    {
        name: "Daniel",
        age: "37",
        sexe: "homme"
    },
    {
        name: "Georges",
        age: "77",
        sexe: "homme"
    },
    {
        name: "Marcel",
        age: "25",
        sexe: "homme"
    },
    {
        name: "Michel",
        age: "40",
        sexe: "homme"
    },
    {
        name: "Francis",
        age: "64",
        sexe: "homme"
    },
    {
        name: "Henry",
        age: "82",
        sexe: "homme"
    },
    {
        name: "Thierry",
        age: "33",
        sexe: "homme"
    },
    {
        name: "Denise",
        age: "12",
        sexe: "femme"
    },
    {
        name: "LOUISE",
        age: "21",
        sexe: "femme"
    },
    {
        name: "Françoise",
        age: "77",
        sexe: "femme"
    }
]

//recup de la barre de recherche
const SEARCH_INPUT= document.getElementById("search-input");
const SEARCH_SUGGESTIONS= document.getElementById("search-suggestions");

console.log(SEARCH_INPUT);

//création de l'évènement
SEARCH_INPUT.addEventListener("keyup", ()=>{
    //ne pas oublier de tout mettre en lower case pour que les recherches matchent
    const input= SEARCH_INPUT.value.toLowerCase();
    const result= persons.filter(item => item.name.toLowerCase().includes(input));

    // console.log(result);

    //vérifie que le champ ne soit pas vide
    if(input != ""){
        //affiche la liste des suggestions
        SEARCH_SUGGESTIONS.innerHTML= result.map(item => `<li class="suggestion">${item.name}</li>`).join("");
        //remplit la barre input du mots clés selectionné
        const SUGGESTIONS= document.querySelectorAll(".suggestion");
        //console.log(SUGGESTIONS)
        SUGGESTIONS.forEach(suggestion => suggestion.addEventListener("click", ()=> {
            SEARCH_INPUT.value= suggestion.textContent;
            //et vide la liste
            SEARCH_SUGGESTIONS.innerHTML= "";
        }));
    }else SEARCH_SUGGESTIONS.innerHTML= "";
    
});