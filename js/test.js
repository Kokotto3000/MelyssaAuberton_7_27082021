//suite de fibonacci
//methode récursive
function fibonacci(n){
    if(n<=1) return 1;
    else return fibonacci(n-1)+fibonacci(n-2);
}

//console.log(fibonacci(10));

//boucle
function fibo(n){
    let a= 0;
    let b= 1;
    let c= 0 ;
    for(let i=0; i< n; i++){
        c= a+b;
        a= b;
        b= c;
    }
    return c;
}

//console.log(fibo(10));

const candidates= {
    "hermione": "Hermione Granger",
    "balou": "Balou",
    "chuck": "Chuck Norris",
    "elsa": "Elsa",
    "gandalf": "Gandalf",
    "beyonce": "Beyoncé"
}

const mentions= [
    "Excellent",
    "Très bien",
    "Bien",
    "Assez bien",
    "Passable",
    "Insuffisant",
    "A rejeter"
]

//exemple de données en entrée
/*const votes= [{"hermione" : 1, "balou": 2, "chuck": 3, "elsa": 4, "gandalf": 5, "beyonce": 6},
{"hermione": 2, "balou": 3, "chuck": 4, "elsa": 5, "gandalf": 6, "beyonce": 0},
{"hermione": 5, "balou": 4, "chuck": 1, "elsa": 2, "gandalf": 0, "beyonce": 3},
{"hermione": 6, "balou": 3, "chuck": 5, "elsa": 1, "gandalf": 2, "beyonce": 4},
{"hermione": 0, "balou": 2, "chuck": 4, "elsa": 3, "gandalf": 1, "beyonce": 5},
{"hermione": 2, "balou": 1, "chuck": 3, "elsa": 5, "gandalf": 6, "beyonce": 4}
]*/

//console.log(Math.ceil(Math.random()*6));

const votesNumber= 1000;
const mediane= 500;
let votes= [];

function createVote(){
    return {
        "hermione": Math.floor(Math.random() * (5 - 1 + 1) + 1),
        "balou": Math.floor(Math.random() * (6 - 0 + 1) + 0),
        "chuck": Math.floor(Math.random() * (4 - 0 + 1) + 0),
        "elsa": Math.floor(Math.random() * (6 - 2 + 1) + 2),
        "gandalf": Math.floor(Math.random() * (3 - 2 + 1) + 2),
        "beyonce": Math.floor(Math.random() * (1 - 0 + 1) + 0)
    }
}

for(let i= 0; i < votesNumber; i++) votes.push(createVote());

//console.log(votes);

//exemple en sortie
/*Gagnant : Hermione avec 70% de mentions Bien
Suivants : 
- Balou avec 50% de mentions bien
- Chuck Norris avec 50% de mentions assez bien
- Elsa avec 70% de mentions passable
- Gandalf avec 60% de mentions passable
- Beyoncé avec 50% de mentions à rejeter*/
//votes.forEach(vote=> console.log(vote.hermione))


const depouillement= {};
//console.log(candidates);


for(candidate in candidates){
    depouillement[candidate]= Array();
    for(let i= 0; i < mentions.length; i++){
        depouillement[candidate][i]= 0;
            
    }
        
}



votes.forEach(vote=> {
    for(candidate in candidates){
        //console.log(vote[candidate]);
        depouillement[candidate][vote[candidate]] += 1;
    }
})

//console.log(depouillement);

/*let RESULTATS= {};

//boucle qui additionne les résultats des mentions jusqu'à ce qu'il y ait au moins 500 et enregistre la mention qui correspond...
for(candidate in candidates){
    let countResults= 0;
    for(let i=0; i < mentions.length; i++){
        countResults += depouillement[candidate][i];
        if(countResults >= mediane){
            //console.log(countResults);
            RESULTATS[candidate]= { "mention" : i, "score" : countResults};
            break;
        }
    }
    
}*/


let RESULTATS= [];

//boucle qui additionne les résultats des mentions jusqu'à ce qu'il y ait au moins 500 et enregistre la mention qui correspond...
for(candidate in candidates){
    let countResults= 0;
    for(let i=0; i < mentions.length; i++){
        countResults += depouillement[candidate][i];
        if(countResults >= mediane){
            //console.log(countResults);
            RESULTATS.push({ "candidate": candidate, "mention" : i, "score" : countResults});
            break;
        }
    }
    
}
RESULTATS.sort((a, b) => {
    if(a.mention === b.mention){
        return b.score - a.score;
    }
    return a.mention -b.mention;
});

//console.log(RESULTATS);

const gagnant= `Notre gagnant ce soir est : ${candidates[RESULTATS[0].candidate]} avec ${(RESULTATS[0].score)*100/1000} % de mentions ${mentions[RESULTATS[0].mention]}`;

console.log(gagnant);

for(let i= 1; i < RESULTATS.length; i++){
    console.log(`- arrivé ${i+1}ème : ${candidates[RESULTATS[i].candidate]} avec ${(RESULTATS[i].score)*100/votesNumber} % de mentions ${mentions[RESULTATS[i].mention]}`);
}

