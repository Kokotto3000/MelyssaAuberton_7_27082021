//classe créée dans le but de normaliser le tableau des datas pour accélérer les recherches une fois le site chargé la première fois
export default class Arrays{
    constructor(recipes){
        this.recipes= recipes;
    }

    navigationArrayGenerator(){
        const navigationArray= [];
        for(const recipe of this.recipes){
           
            const ingredientsArray= [];
            for(const ingredients of recipe.ingredients){
                
                ingredientsArray.push(ingredients.ingredient.toLowerCase());
            }
            
            recipe.ustensils= recipe.ustensils.map(ustensile=> ustensile.toLowerCase());
            
            navigationArray.push({ 
                // "id" : recipe.id,
                "name" : recipe.name.toLowerCase(),
                "description" : recipe.description.toLowerCase(),
                "ingredients" : ingredientsArray,
                "appareils" : recipe.appliance.toLowerCase(),
                "ustensiles" : recipe.ustensils,
                "recipe" : recipe
            });
        }

        //tri les recettes par ordre alphabétique sur leur nom, les recettes seront affichées par ordre alphabétique
        navigationArray.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        
        return navigationArray;
    }
}