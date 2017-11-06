/* global $ */

var computerPattern = [],
    personPattern = [],
    offset = 0,
    strictMode = false,
    incorrect = false,
    win = false,
    rand;

//Beep audio
var beep0 = $('#beep0')[0],
    beep1 = $('#beep1')[0],
    beep2 = $('#beep2')[0],
    beep3 = $('#beep3')[0];

//Set strict mode
$('input[name="strict"]:radio').on('change', function() {
    if ($('input[name="strict"]:checked').val() === 'on') {
        strictMode = true;
    }
    else {
        strictMode = false;
    }
});

//Computer pattern
function pattern() {
    offset = 0;
    //Generate random number between 0-3. Get div with that index number
    if (incorrect === false) {
        rand = Math.floor(Math.random() * 4);
        computerPattern.push(rand);
    }

    //Animate circles
    computerPattern.forEach(function(item) {
        setTimeout(function() {

            //Play beep and animate divs
            animate(item);

        }, 750 + offset);

        //Update offset
        offset += 750;
    });

    //Show pattern length
    $('#len').text(computerPattern.length);

    //Start user's turn
    person();
}

//User
function person() {
    //Set/reset variables
    personPattern = [];
    
    var clicks = 0,
        clickedDiv,
        length = computerPattern.length;

    //Clear event listeners
    $(".sect").off();
    //Circle click function
    $(".sect").click(function() {
        //Get index of clicked div
        clickedDiv = $(this).index();

        //Play beep and animate div
        animate(clickedDiv);

        //If user enters incorrect pattern
        if (clickedDiv != computerPattern[clicks]) {
            //If strict, alert and start over
            if (strictMode) {
                reset();
                $('.overMsg').text('Game Over!').show();
            }

            //If wrong, set var to true and reset vars
            incorrect = true;

            personPattern = [];

            clicks = 0;

            //Show 'X' 
            $('.sect').eq(clickedDiv).find('span').fadeIn().fadeOut();

            //Call computer function
            setTimeout(pattern, 1000);
        }
        else {
            incorrect = false;

            //Increase number of clicks
            clicks++;

            //Push index to array
            personPattern.push(clickedDiv);

            //If num. of clicks is equal to Comp div length
            if (clicks === length) {
                setTimeout(check, 700);
            }
        }
    });

}

function animate(item) {

    $(".container div").eq(item).css({ "transform": "scale(1.1)", "z-index": "999" }).delay(300).queue(function(next) {
        $(this).css({ "transform": "scale(1)" }).delay(300).queue(function(next) {
            $(this).css({ "z-index": "0" });
            next();
        });
        next();
    });

    switch (item) {
        case 0:
            beep0.play();
            break;
        case 1:
            beep1.play();
            break;
        case 2:
            beep2.play();
            break;
        case 3:
            beep3.play();
            break;
    }
}

//Check the whole pattern
function check() {
    for (var i = computerPattern.length; i--;) {
        if (computerPattern[i] !== personPattern[i]) {
            return;
        }
        else {
            console.log("same");
            incorrect = false;
            if (personPattern.length === 20) {
                reset();
                win = true;
                $('.overMsg').text('You Win!').show();
            }
            else {
                if (!win) {
                    pattern();
                }
            }
        }
    }
}

function reset() {
    offset = 0;
    computerPattern = [];
    personPattern = [];
    incorrect = false;
    win = false;
    $('#len').text(computerPattern.length);
    $('.overMsg').hide();
}


$('#start').click(function() {
    pattern();
});

$('#reset').click(function() {
    reset();
});
