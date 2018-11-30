//Change the value on the screen
function changeValue(number) {
    document.getElementById('ScreenText').innerHTML = number;
}

//Init the screen in the begining of the web  
function initScreen() {
    document.getElementById('ScreenText').innerText = '0';
}

//Change the text on div by the num of press
function Cancel(bIsCancel) {
    var valueCancel = bIsCancel ? 'AC' : 'C';
    document.getElementById('Cancel').innerText = valueCancel;
}

//The func that calculate the numbers by params
function Action(firstNum, action, secNum) {
    var sum;

    // Get the function and do the correct action
    switch (action) {
        case '+':
            sum = parseFloat(firstNum) + parseFloat(secNum);
            break;
        case '*':
            sum = parseFloat(firstNum) * parseFloat(secNum);       
            break;
        case '/':
            sum = parseFloat(firstNum) / parseFloat(secNum);
            break;
        case '-':
            sum = parseFloat(firstNum) - parseFloat(secNum);
            break;    
    } 

    temp=sum;
    return sum;  
}

// init 
initScreen();

// Variables
var sign        = ['+', '-', '*', '/'];
var numbers     = ['0','1','2','3','4','5','6','7','8','9', '.'];
var elem        = document.getElementsByTagName('div');
var bIsExist    = false;
var temp        = '';
var firstNumber = '';
var action      = '';
var secNumber   = '';
var sum         = 0;


// Loop of the elements div by their values 
for (let i= 0; i < elem.length; i++) {
    // Check this functions when we clicked 
    elem[i].onclick = function() {
        // Loop the signs and check if cuurent value is sign
        sign.forEach(function(s) {
            if (elem[i].getAttribute('value') == s) {
                // Boolean that checks whether a button of arithmetic is pressed
                bIsExist = true; 
                action = s;
                Cancel(false);
            }
           
        });

        // Clean the screen if this pressed
        if (elem[i].getAttribute('value') == 'C') {
            bIsExist = false; 
            changeValue('0');
            Cancel(false);
            temp = '';
        }
        
        // Save the numbers if action pressed 
        if ((elem[i].getAttribute('value') != 'C') && 
            (elem[i].getAttribute('value') != '=')) {
                if (!bIsExist) {
                    Cancel(true);
                    // Checks that the number will not slip after the screen
                    if (temp.length < 16) {
                        temp = temp.concat(elem[i].getAttribute('value'));
                     }
            
                    changeValue(temp);
                }
                else {
                    firstNumber = temp;
                    temp = '';
                    bIsExist = false;
                }
          
        } 
       
       // Check if the sign is equals
        if (elem[i].getAttribute('value') == '=') {
            secNumber = temp;
            bIsExist = false;
            if (firstNumber != null || secNumber != null || action != null) {
                sum = Action(firstNumber, action, secNumber);
                changeValue(sum);
            }
        } 
    }
}
