var speelbord = document.getElementById("container");
var inRow = 1;
var inColumn = 1;
var randomWord, keysWord = '';
var correctLetters;
var isTyping = true;
var hasWon = false;


function start() {
//dit is zodat die een random woord pakt, en het woord laat zien in de console
    randomWord = words[Math.floor(Math.random() * words.length)];
    console.log(randomWord);
    correctLetters = [randomWord.charAt(0), "", "", "", ""];
//dit zorgt ervoor dat het speelbord word getoond, dus de vierkantjes
    for( row = 1; row < 6; row++) {
        var divRow = document.createElement("div");
            divRow.id = ("r_" + row);
            speelbord.appendChild(divRow);
    for(colomn = 1; colomn < 6; colomn++) {
        var divColomn = document.createElement("div");
            divColomn.id = ("c_" + row + "." + colomn);
            divRow.appendChild(divColomn);

            var paragraph = document.createElement("p");
            paragraph.style.position = "absolute";
            paragraph.style.margin = "0";
            paragraph.style.lineHeight = "35px";
            paragraph.style.textAlign = "center";
            paragraph.style.width = "35px";
            
            divColomn.appendChild(paragraph);
        }   
    }   
    addCorrect();
}
start();

function addCorrect() {
    if (correctLetters != null) {
    for (var i = 0; i < 5; i++) {
         var click = document.getElementById("c_" + inRow + "." + (i + 1)).firstChild;
         click.innerHTML = correctLetters [i].toUpperCase();
         click.style.opacity = "0.5";
}
        }
}


//deze code zorgt ervoor dat je kan typen in de vakjes
document.onkeypress = function(event) {
    var key_press = String.fromCharCode(event.keyCode);
    if (key_press.match(/[a-z]/i) && inRow <= 5 && isTyping == true) {
        var click = document.getElementById("c_" + inRow + "." + inColumn++).firstChild;
        click.innerHTML = key_press.toUpperCase();
        click.style.opacity = "1.0";
        keysWord += key_press.toLowerCase();
        if(inColumn > 5) {
            check(keysWord);
            inRow++;
        if (inRow > 5 && hasWon == false) {
            correctLetters = null;
            setTimeout(function() {
                alert("Ah jammer dit is fout. Het goede woord was " + randomWord.toUpperCase());
             window.location.reload();
        }, 500);
        }
            inColumn = 1;
            keysWord = "";
            isTyping = false;
            //dit zorgt ervoor dat als je typt dat je niet kan spammen
            setTimeout(function() {
                isTyping = true;
                addCorrect();

            }, 1000);
        }
    }
}


//hier checked die de woorden
function check(guessWord) {
    var goodWord = randomWord.split("");
    var myWord = guessWord.split("");

    for (var i = 0; i < goodWord.length; i++){
        if (myWord[i] == goodWord[i]) {
            correctLetters[i] = goodWord[i];
            var column = document.getElementById("c_" + inRow + "." + (i + 1));
            column.style.backgroundColor = "green"; 

            goodWord[i] = "";
            myWord[i] = "*";
        } 
    }
    if(checkAllValues(myWord) == true) {
        hasWon = true;
        setTimeout(function(){
            alert("Goedzo! Op naar het volgende woord :)");
        window.location.reload();
    }, 500);
    }
    for (var i = 0; i < goodWord.length; i++) {
        for (var j = 0; j < goodWord.length; j++) {
            if (myWord[i] == goodWord[j]) {
                var column = document.getElementById("c_" + inRow + "." + (i + 1));
                column.style.backgroundColor = "yellow";
                column.style.borderRadius = "55px";

                goodWord[j] = "";
                myWord[i] = "*";
            }
        }
    }
}


//Hier checked die of alles wat je typed gelijk is aan het * (myWord). Wat je moet raden/typen checked die
function checkAllValues(myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (!(myArray[i].includes("*"))) {
            return false;
        }
        if (i == myArray.length-1) {
            if (myArray[i] != "*") {
                return false;
            }
            return true;
        }
    }
}

function lingoAnimate() {
    var i, correct;
    if (animateIt >= 0) {
        if (animateIt < randomWord.length) {
            animateIt += 1;
            if (animateIt < randomWord.length) {
                playSample(animateIt);
            }
        } else {
            correct = true;
            for (i = 0; i < randomWord.length; i += 1) {
                if (randomWord.charAt(i) !== lingoGrid[lingoGridY - 1][i]) { correct = false; }
            }
            if (correct) {
                // fwResultOk(false);
                if (lingoGridY <= 5) {
                    m_points += 1;
                }
                m_finished = true;
                startHighlightNext();
            }

            if (!correct && (lingoGridY === 5)) {
                // move up
                lingoOffsetY = 1;
                // animate correct word
                animateIt = 0;
                playSample(animateIt);
                lingoGridY = 6;

                m_finished = true;
                startHighlightNext();
            } else {
                // stop animation
                animateIt = -1;
                if (m_animateRowInterval !== null) {
                    clearInterval(m_animateRowInterval);
                    m_animateRowInterval = null;
                }
            }
        }
        draw();
    }
}
