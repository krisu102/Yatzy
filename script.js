//TableVariables
const Ones = document.getElementById("Ones");
const Twos = document.getElementById("Twos");
const Threes = document.getElementById("Threes");
const Fours = document.getElementById("Fours");
const Fives = document.getElementById("Fives");
const Sixes = document.getElementById("Sixes");
const OnePair = document.getElementById("1Pair");
const TwoPair = document.getElementById("2Pair");
const ThreeOfkind = document.getElementById("3ofkind");
const FourOfKind = document.getElementById("4ofkind");
const SmallStraight = document.getElementById("SmallStraight");
const LargeStraight = document.getElementById("LargeStraight");
const FullHouse = document.getElementById("FullHouse");
const Chance = document.getElementById("Chance");
const Yatzy = document.getElementById("Yatzy");
const Sum = document.getElementById("Sum");
const Bonus = document.getElementById("Bonus");
const Total = document.getElementById("Total");
const TableVariables = [Ones, Twos, Threes, Fours, Fives, Sixes, OnePair, TwoPair, ThreeOfkind, FourOfKind, SmallStraight, LargeStraight, FullHouse, Chance, Yatzy];

const Button = document.getElementById("Button");
var RollCounter = 3;
var Chosen = true;
var NumbersSum = 0, EverythingTotal = 0;

//DiceElements
const Dice1 = document.getElementById("dice1");
const Dice2 = document.getElementById("dice2");
const Dice3 = document.getElementById("dice3");
const Dice4 = document.getElementById("dice4");
const Dice5 = document.getElementById("dice5");
const ElementDice = [Dice1, Dice2, Dice3, Dice4, Dice5];

var d1 = {value: 0, Roll: true};
var d2 = {value: 0, Roll: true};
var d3 = {value: 0, Roll: true};
var d4 = {value: 0, Roll: true};
var d5 = {value: 0, Roll: true};
var Dice = [d1, d2, d3, d4, d5];

//EventListeners
for(var i = 0; i < TableVariables.length; i++){
    TableVariables[i].addEventListener("click", Choose);
}

//Roll dice button
function RollDice(){
    RollCounter -= 1;

    if(RollCounter < 1){
        Button.disabled = true;
    }

    Chosen = true;

    document.getElementById("SpawnP1").innerHTML = "Throws left: " + RollCounter;

    RollAnimation();
    setTimeout(() => {
        
        for(var i = 0; i < Dice.length; i++){
            if(Dice[i].Roll == true){
                //random numbers for Dice
                Dice[i].value = Math.floor(Math.random() * 6) + 1;
                //change divs
                //ElementDice[i].innerHTML = Dice[i].value;
                if(Dice[i].value == 1) ElementDice[i].firstChild.src = "images/dice1.png";
                if(Dice[i].value == 2) ElementDice[i].firstChild.src = "images/dice2.png";
                if(Dice[i].value == 3) ElementDice[i].firstChild.src = "images/dice3.png";
                if(Dice[i].value == 4) ElementDice[i].firstChild.src = "images/dice4.png";
                if(Dice[i].value == 5) ElementDice[i].firstChild.src = "images/dice5.png";
                if(Dice[i].value == 6) ElementDice[i].firstChild.src = "images/dice6.png";
        }
    }
        CalculateTotal();
        Chosen = false;

        }, 1000);
        
}

function RollAnimation(){
    for(var i = 0; i < Dice.length; i++){
        if(Dice[i].Roll == true){
            ElementDice[i].firstChild.src = "images/diceAnimation.gif";
        }
    }

}

//function for holding dice
function Hold(index){
    if(RollCounter < 3){
        if(Dice[index].Roll == true){
            Dice[index].Roll = false;
            ElementDice[index].style.border = "2px solid red";
        }
        else{
            Dice[index].Roll = true;
            ElementDice[index].style.borderColor = "#999";
        }
    }
}

function CalculateTotal(){

    //sort dice array for checking
    var sortedNumbers = [Dice[0].value, Dice[1].value, Dice[2].value, Dice[3].value, Dice[4].value];
    sortedNumbers.sort(function(a, b){return a - b});

    //variables
    var onesTotal = 0, twosTotal = 0, threesTotal = 0, foursTotal = 0, fivesTotal = 0, sixesTotal = 0;
    var onepairTotal = 0, twopairTotal = 0, threeofkindTotal = 0, fourofkindTotal = 0, largestraightTotal = 0, smallstraightTotal = 0, 
    total = 0 ,fullhouseTotal = 0, yatzyTotal = 0;

    //Total
    total = sortedNumbers[0] + sortedNumbers[1] + sortedNumbers[2] + sortedNumbers[3] + sortedNumbers[4];

    //Numbers
    for(var i = 0; i < Dice.length; i++){
        switch (Dice[i].value) {
            case 1:
                onesTotal += Dice[i].value;
                break;
            case 2:
                twosTotal += Dice[i].value;
                break;
            case 3:
                threesTotal += Dice[i].value;
                break;
            case 4:
                foursTotal += Dice[i].value;
                break;
            case 5:
                fivesTotal += Dice[i].value;
                break;
            case 6:
                sixesTotal += Dice[i].value;
                break;
            default:
                break;
        }
    }

    //1 Pair, 2 Pair, 3 of kind and 4 of kind
    var previous = 0, tempTwopair = 0, pairCounter = 0;
    for(var i = 0; i < sortedNumbers.length; i++){

        //check for 4 of kind
        if(threeofkindTotal / 3 == sortedNumbers[i]){
            fourofkindTotal = threeofkindTotal + sortedNumbers[i];
        }

        //check for 3 of kind
        if(tempTwopair / 2 == sortedNumbers[i]){
            threeofkindTotal = tempTwopair + sortedNumbers[i];
        }


        if(sortedNumbers[i] == previous){
            pairCounter++;
            
            //check if there is 2 pairs and they are not the same numbers
            if(pairCounter == 2 && tempTwopair != (sortedNumbers[i] + previous)){
                twopairTotal = tempTwopair + (sortedNumbers[i] + previous)
            }
            tempTwopair = sortedNumbers[i] + previous;

            //check if second pair is bigger that first pair
            if(onepairTotal < (sortedNumbers[i] + previous)){
                onepairTotal = sortedNumbers[i] + previous;
            }

        }
        previous = sortedNumbers[i];
    }

    //small and large straight

    if(sortedNumbers[0] == 1 && sortedNumbers[1] == 2 && sortedNumbers[2] == 3 && sortedNumbers[3] == 4 && sortedNumbers[4] == 5){
        smallstraightTotal = 15;
    } 
    if(sortedNumbers[0] == 2 && sortedNumbers[1] == 3 && sortedNumbers[2] == 4 && sortedNumbers[3] == 5 && sortedNumbers[4] == 6){
        largestraightTotal = 20;
    }

    //Yatzy

    if(sortedNumbers[0] == sortedNumbers[1] && sortedNumbers[0] == sortedNumbers[2] && sortedNumbers[0] == sortedNumbers[3] && 
        sortedNumbers[0] == sortedNumbers[4]){
        yatzyTotal = 50;
    }

    //Full house

    if(sortedNumbers[0] == sortedNumbers[1] & sortedNumbers[2] == sortedNumbers[3] && sortedNumbers[3] == sortedNumbers[4] &&
        yatzyTotal == 0){
        fullhouseTotal = total;
    }
    if(sortedNumbers[0] == sortedNumbers[1] & sortedNumbers[1] == sortedNumbers[2] && sortedNumbers[3] == sortedNumbers[4] &&
        yatzyTotal == 0){
        fullhouseTotal = total;
    }

    



    //add everything to table
    if(Ones.cells[1].style.backgroundColor != "grey") Ones.cells[1].innerHTML = onesTotal;
    if(Twos.cells[1].style.backgroundColor != "grey") Twos.cells[1].innerHTML = twosTotal;
    if(Threes.cells[1].style.backgroundColor != "grey") Threes.cells[1].innerHTML = threesTotal;
    if(Fours.cells[1].style.backgroundColor != "grey") Fours.cells[1].innerHTML = foursTotal;
    if(Fives.cells[1].style.backgroundColor != "grey") Fives.cells[1].innerHTML = fivesTotal;
    if(Sixes.cells[1].style.backgroundColor != "grey") Sixes.cells[1].innerHTML = sixesTotal;
    if(OnePair.cells[1].style.backgroundColor != "grey") OnePair.cells[1].innerHTML = onepairTotal;
    if(TwoPair.cells[1].style.backgroundColor != "grey") TwoPair.cells[1].innerHTML = twopairTotal;
    if(ThreeOfkind.cells[1].style.backgroundColor != "grey") ThreeOfkind.cells[1].innerHTML = threeofkindTotal;
    if(FourOfKind.cells[1].style.backgroundColor != "grey") FourOfKind.cells[1].innerHTML = fourofkindTotal;
    if(SmallStraight.cells[1].style.backgroundColor != "grey") SmallStraight.cells[1].innerHTML = smallstraightTotal;
    if(LargeStraight.cells[1].style.backgroundColor != "grey") LargeStraight.cells[1].innerHTML = largestraightTotal;
    if(FullHouse.cells[1].style.backgroundColor != "grey") FullHouse.cells[1].innerHTML = fullhouseTotal;
    if(Chance.cells[1].style.backgroundColor != "grey") Chance.cells[1].innerHTML = total;
    if(Yatzy.cells[1].style.backgroundColor != "grey") Yatzy.cells[1].innerHTML = yatzyTotal;
    
    
}


function Choose(){
    if(Chosen != true){
        if(this.cells[1].style.backgroundColor != "grey"){
       
            this.cells[1].style.backgroundColor = "grey";
        
            if(this == Ones || this == Twos || this == Threes || this == Fours || this == Fives || this == Sixes){
                NumbersSum += parseInt(this.cells[1].innerHTML);
            }
            EverythingTotal += parseInt(this.cells[1].innerHTML);

            Chosen = true;

            //unhold every holded dice
            for(var i = 0; i < Dice.length; i++){
                if(Dice[i].Roll == false){
                    Hold(i);
                }
            }

            //RollCounter and button
            RollCounter = 3;
            if(Button.disabled == true){
                Button.disabled = false;
            }

            }
    
        //add sum, total and bonus
        Sum.cells[1].innerHTML = NumbersSum;
        Total.cells[1].innerHTML = EverythingTotal;
        if(NumbersSum >= 63){
            Bonus.cells[1].innerHTML = 50;
            Total.cells[1].innerHTML = EverythingTotal + 50;
        } 
        else Bonus.cells[1].innerHTML = 0;

        document.getElementById("SpawnP1").innerHTML = "Throws left: " + RollCounter;

    }
    

}