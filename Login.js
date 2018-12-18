// Get the json of users
var jUsers = $.getJSON("user.json", function() {
    console.log("success");
});

// Get the json of recipes
var jRecipes = $.getJSON("Recipe.json", function() {
    console.log("success");
});


// Check if the data is correct
function checkData(e) {
    // Get the data the user typed 
    var userName = $('#inputUser').val();
    var password = $('#inputPassword').val();
    var bIsFind  = false;

    for(let nIndex = 0; ((nIndex < jUsers["responseJSON"].length) && (!bIsFind)); nIndex++) {
        if ((jUsers['responseJSON'][nIndex]['name'] == userName) && 
            (jUsers['responseJSON'][nIndex]['password'] == password)) {
            window.location.replace('./Cookbook.html');
            e.preventDefault();
            bIsFind = true;
        }
    }

    if((!bIsFind) && (userName != "") && (password != "")) {
        $('div.Error').text('The user or password incorrect');
        return true;
    }   

    return false;
}

$("#Login").click(function (e) {
    var state = checkData(e);
    if (state) {
        e.preventDefault();
    }
    else {
        $('div.Error').text('');
    }
});