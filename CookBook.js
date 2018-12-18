// Add object by parameters of json
function recipeDiv(image, recipeName, preparationTime, id) {
    return `<div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="${image}"
                    data-holder-rendered="true">
                <div class="card-body">
                    <p class="card-text">${recipeName}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary" value="${id}">Go To Recipe!</button>
                            </div>
                            <small class="text-muted">${preparationTime} h</small>
                        </div>
                    </div>
                </div>
            </div>`
}

// Generate the html and append the chosen
function generateRecipes(recipes) {
    for (const recipe of recipes) {
        let div = recipeDiv(recipe.image, recipe.name, recipe.preparationTime, recipe.id);
        $('#recipeData').append(div);
    }
}

// The first loading
$(document).ready(function() {
    if(document.referrer != "") {
        // Get the json of Recipes    
        $.getJSON("Recipe.json").then(generateRecipes)
    }
    else {
        setTimeout(function(){ window.location.replace('./Login.html'); }, 0);
        
    }
});

var getRecipes = new Promise(function(resolve, reject) {
    var x = $.getJSON("Recipe.json");

    if (x != undefined) {
        resolve(x);
    }
    else {
        reject(Error("It broke"));
    }
});

// Return the recipe to web 
function recipeData(nameRecipe, ingredients, steps, image) {
    var recipeData = `<div id='recipeId' class="card mb-4 shadow-sm">
                      <div class="card mb-6 shadow-sm">
                      <img class="card-img-top"
                      style="height: 225px; width: 100%; display: block;" src="${image}"
                      data-holder-rendered="true">
                      </div>
                      <div class="card-body"><div>`; 
    recipeData += `<h1 class="mt-5">${nameRecipe}</h1>\n`;
    recipeData += `<h3 class="mt-5">Ingredients</h3>\n`;
    recipeData += `<ol>`;

    // Loop ingredient object
    for (const ingredient of ingredients) {
        recipeData += `<li>
                            ${ingredient.quantity}
                            ${ingredient.name}
                            ${ingredient.type}
                        </li>`
    }
    recipeData += `</ol>`;
    recipeData += `<h3 class="mt-5">Steps</h3>\n`;
    recipeData += `<ol>`;

    // Loop steps object
    for (const step of steps) {
        recipeData += `<li>
                        ${step}
                       </li>`
    }

    recipeData += `</ol>`;
    recipeData += `</div>`;

    return recipeData;
}

// Show the data of recipe
function showRecipe(recipeId) {
    var promise = new Promise(function(resolve, reject) {
        getRecipes.then(function(recipes) {
            var recipe = recipes.find((elem) => { return elem.id == recipeId });
            var a = recipeData(recipe.name, recipe.ingredients, recipe.steps, recipe.image)

            resolve(a);
        }).catch(reject)
    })

    return promise;
}

var q = new Promise(function(resolve, reject) {
    getRecipes.then(function(recipes) {
        resolve("Done")
    })
});

// Click dynamic on html that created
$(document).delegate('.btn', 'click', function () {
    var recipeId = $(this).val();
    $('.lead').hide();
    $('#albumRecipe').hide();
    $('.jumbotron-heading').hide();
    showRecipe(recipeId).then((recipe) => {
        $('#recipes').append(recipe);    
    });
});

// Return to main page
$('#mainPage').click(function() {
    $('#recipeId').remove();
    $('#recipes').show();
    $('.lead').show();
    $('#albumRecipe').show();
    $('.jumbotron-heading').show();
});