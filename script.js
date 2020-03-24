//TableVariables
const table = document.getElementById("tb1");
const Header = document.getElementById("Header");
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
const AllTableVariables = [Header, Ones, Twos, Threes, Fours, Fives, Sixes, Sum, Bonus, OnePair, TwoPair, ThreeOfkind, FourOfKind, SmallStraight, LargeStraight, FullHouse, Chance, Yatzy, Total];

const NumOfPlayers = document.getElementById("numOfPlayers");
const Button = document.getElementById("Button");

var CurrentNumOfPlayers = 1;
var CurrentPlayer = 1;

var RollCounter = 3;
var Chosen = true;
var NumbersSum = [0,0,0,0], EverythingTotal = [0,0,0,0];

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

function SetTable(){
    PlayersSelect();
}

//EventListeners
for(var i = 0; i < TableVariables.length; i++){
    TableVariables[i].addEventListener("click", Choose);
}

NumOfPlayers.addEventListener("change", PlayersSelect);


//Change table columns based on num of players
function PlayersSelect(){
    if(NumOfPlayers.value < CurrentNumOfPlayers){
        for(var i = CurrentNumOfPlayers; i > NumOfPlayers.value; i--){
            RemoveColumn();
        }
    }
    if(NumOfPlayers.value > CurrentNumOfPlayers){
        for(var i = CurrentNumOfPlayers; i < NumOfPlayers.value; i++){
            AddColumn(i);
        }
    }

    CurrentNumOfPlayers = NumOfPlayers.value;
}

function AddColumn(i) {
    i++;
    //add header
        var tr = document.getElementById('tb1').tHead.children[0],
        th = document.createElement('th');
        th.innerHTML = "Player " + i;
        tr.appendChild(th);
    
    //add columns
    for(var i = 1; i < AllTableVariables.length; i++){
        var row = AllTableVariables[i];
        var cell = row.insertCell(-1);
        cell.innerHTML = "0";
    }
  }

  function RemoveColumn(){
    //remove columns
    for(var i = 0; i < AllTableVariables.length; i++){
        var row = AllTableVariables[i];
        row.deleteCell(-1);
  }
}




//Roll dice button
function RollDice(){
    Button.disabled = true;
    NumOfPlayers.disabled = true;
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

        if(RollCounter >= 1){
            Button.disabled = false;
        }

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
            if(pairCounter > 1 && tempTwopair != (sortedNumbers[i] + previous)){
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
    if(Ones.cells[CurrentPlayer].style.backgroundColor != "grey") Ones.cells[CurrentPlayer].innerHTML = onesTotal;
    if(Twos.cells[CurrentPlayer].style.backgroundColor != "grey") Twos.cells[CurrentPlayer].innerHTML = twosTotal;
    if(Threes.cells[CurrentPlayer].style.backgroundColor != "grey") Threes.cells[CurrentPlayer].innerHTML = threesTotal;
    if(Fours.cells[CurrentPlayer].style.backgroundColor != "grey") Fours.cells[CurrentPlayer].innerHTML = foursTotal;
    if(Fives.cells[CurrentPlayer].style.backgroundColor != "grey") Fives.cells[CurrentPlayer].innerHTML = fivesTotal;
    if(Sixes.cells[CurrentPlayer].style.backgroundColor != "grey") Sixes.cells[CurrentPlayer].innerHTML = sixesTotal;
    if(OnePair.cells[CurrentPlayer].style.backgroundColor != "grey") OnePair.cells[CurrentPlayer].innerHTML = onepairTotal;
    if(TwoPair.cells[CurrentPlayer].style.backgroundColor != "grey") TwoPair.cells[CurrentPlayer].innerHTML = twopairTotal;
    if(ThreeOfkind.cells[CurrentPlayer].style.backgroundColor != "grey") ThreeOfkind.cells[CurrentPlayer].innerHTML = threeofkindTotal;
    if(FourOfKind.cells[CurrentPlayer].style.backgroundColor != "grey") FourOfKind.cells[CurrentPlayer].innerHTML = fourofkindTotal;
    if(SmallStraight.cells[CurrentPlayer].style.backgroundColor != "grey") SmallStraight.cells[CurrentPlayer].innerHTML = smallstraightTotal;
    if(LargeStraight.cells[CurrentPlayer].style.backgroundColor != "grey") LargeStraight.cells[CurrentPlayer].innerHTML = largestraightTotal;
    if(FullHouse.cells[CurrentPlayer].style.backgroundColor != "grey") FullHouse.cells[CurrentPlayer].innerHTML = fullhouseTotal;
    if(Chance.cells[CurrentPlayer].style.backgroundColor != "grey") Chance.cells[CurrentPlayer].innerHTML = total;
    if(Yatzy.cells[CurrentPlayer].style.backgroundColor != "grey") Yatzy.cells[CurrentPlayer].innerHTML = yatzyTotal;
    
    
}


function Choose(){
    if(Chosen != true){
        if(this.cells[CurrentPlayer].style.backgroundColor != "grey"){
       
            this.cells[CurrentPlayer].style.backgroundColor = "grey";
        
            if(this == Ones || this == Twos || this == Threes || this == Fours || this == Fives || this == Sixes){
                NumbersSum[CurrentPlayer - 1] += parseInt(this.cells[CurrentPlayer].innerHTML); 
            }

            EverythingTotal[CurrentPlayer - 1] += parseInt(this.cells[CurrentPlayer].innerHTML);

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

    
        //add sum, total and bonus
        Sum.cells[CurrentPlayer].innerHTML = NumbersSum[CurrentPlayer - 1];
        Total.cells[CurrentPlayer].innerHTML = EverythingTotal[CurrentPlayer - 1];
        if(NumbersSum[CurrentPlayer - 1] >= 63){
            Bonus.cells[CurrentPlayer].innerHTML = 50;
            Total.cells[CurrentPlayer].innerHTML = EverythingTotal[CurrentPlayer - 1] + 50;
        } 
        else Bonus.cells[CurrentPlayer].innerHTML = 0;

        document.getElementById("SpawnP1").innerHTML = "Throws left: " + RollCounter;
  

        //change current player
        if(CurrentPlayer < CurrentNumOfPlayers){
            CurrentPlayer++;
        }
        else CurrentPlayer = 1;
        }

        document.getElementById("SpawnP2").innerHTML = "Player " + CurrentPlayer;

    }
    

}