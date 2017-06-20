/* global $ */

var computerPattern = [];
var personPattern = [];
var offset = 0;
var patternCnt = 0;
var strictMode = false;
var incorrect = false;
var win = false;
var rand;

var beep0 = $('#beep0')[0];
var beep1 = $('#beep1')[0];
var beep2 = $('#beep2')[0];
var beep3 = $('#beep3')[0];

$('input[name="strict"]:radio').on('change', function() {
    if ($('input[name="strict"]:checked').val() === 'on') {
        strictMode = true;
    }
    else {
        strictMode = false;
    }
    console.log(strictMode);
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

            $(".container div").eq(item).css("transform", "scale(1.1)").delay(300).queue(function(next) {
                $(this).css("transform", "scale(1)");
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
        }, 750 + offset);
        offset += 750;
    });
    //Show pattern length
    $('#len').text(computerPattern.length);
    person();
}

//User
function person() {
    //Set/reset variables
    personPattern = [];
    var clicks = 0;
    var clickedDiv;
    var length = computerPattern.length;
    //Clear event listeners
    $(".sect").off();
    //Circle click function
    $(".sect").click(function() {
        //Get index of clicked div
        clickedDiv = $(this).index();

        switch (clickedDiv) {
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
        //If user enters incorrect pattern
        if (clickedDiv != computerPattern[clicks]) {
            //If strict, alert and start over
            if (strictMode) {
                reset();
                $('.overMsg').text('Game Over!').show();
            }
            //If wrong, set var to true
            incorrect = true;
            //Reset arr and clicks
            personPattern = [];
            console.log(personPattern);
            clicks = 0;
            //Show 'X' 
            $('.sect').eq(clickedDiv).find('span').fadeIn().delay(50).fadeOut();
            pattern();
        }
        else {
            incorrect = false;
            //Increase number of clicks
            clicks++;
            //Animation on circle click
            $(this).css("transform", "scale(1.1)").delay(300).queue(function(next) {
                $(this).css("transform", "scale(1)");
                next();
            });

            //Push index to array
            personPattern.push(clickedDiv);
            //If num. of clicks is equal to Comp div length
            if (clicks === length) {
                setTimeout('check()', 700);
                console.log("p", personPattern);
                console.log("c", computerPattern);
            }
        }
    });

}
//Check the whole pattern
function check() {
    for (var i = computerPattern.length; i--;) {
        if (computerPattern[i] !== personPattern[i]) {
            //console.log("not same");
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
    patternCnt = 0;
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
