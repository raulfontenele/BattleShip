//Variables
var personalShipPosition = [];
var adversaryShipPosition = [];
var personalRightShot = [];
var personalWrongShot = [];
var adversaryRightShot = [];
var adversaryWrongShot = [];
var adversaryShotPossibilities = [];
var shipCont = 0;
var level = 0;
var flagChoose = false;
var flagGame = false;
var level1 = 7;
var level2 = 12;
var level3 = 15;
var ship1 = 1;
var ship2 = 2;
var flagShip1 = false;
var flagShip1Selected = false;
var flagShip2Selected = false;
var flagShip2 = false;

function initPersonalShipPosition(){
    for(var i = 0; i<= 1; i++) personalShipPosition[i] = [];
}

function resetGame(){
    flagChoose = false;
    flagShip1 = false;
    flagShip2 = false;
    flagShip1Selected = false;
    flagShip2Selected = false;

    personalShipPosition = [];
    adversaryShipPosition = [];
    personalRightShot = [];
    personalWrongShot = [];
    adversaryRightShot = [];
    adversaryWrongShot = [];
    adversaryShotPossibilities = [];
}

function setLevel1(){
    level = level1;
    shipCont = 5;
    createTable(level,"setPersonalShipPosition");
    resetGame();

}
function setLevel2(){
    level = level2;
    shipCont = 7;
    createTable(level,"setPersonalShipPosition");
    resetGame();
}
function setLevel3(){
    level = level3;
    shipCont = 9;
    createTable(level,"setPersonalShipPosition");
    resetGame();
}

function setFlagChoose(){
    flagChoose = true;
    showShips();
    initPersonalShipPosition();
    alert("Control message!");
}

function starGame(){
    if(!flagGame){
        if(personalShipPosition.length == shipCont){
            rebuildTableGaming("shotClick");
            chooseAdversaryShipPosition();
            createVectorOfPossibilities();
            flagGame = true;
            flagChoose = false;
        }
        else{
            alert("You have not added all ships");
        }
    }
    else{
        alert("Game started!");
    }

}

function createTable(level,fun){

    // Personal table
    var stringTable = "<table class = 'table'>";
    for (var line = 0; line < level; line++){
        stringTable = stringTable + "<tr>";

        for (var column = 0; column < level; column++){

            stringTable = stringTable + "<td>";
            
            if(column == 0 && line == 0) stringTable = stringTable + "Code";
            else if (line == 0 && column > 0) stringTable = stringTable + String.fromCharCode(column + 64);
            else if(column == 0) stringTable = stringTable + line;
            else stringTable = stringTable + "<img src = 'images/water.png' class = 'inputTable' onclick = '"+ fun +"(" + ((line-1)*(level-1) + column) + ")'>"

            stringTable = stringTable + "</td>";
        }
        stringTable = stringTable + "</tr>";
    }
    stringTable = stringTable + "</table>";
    document.getElementById("personalTable").innerHTML = stringTable;

    //Adversary table
    stringTable = "<table class = 'table'>";
    for (var line = 0; line < level; line++){
        stringTable = stringTable + "<tr>";

        for (var column = 0; column < level; column++){

            stringTable = stringTable + "<td>";
            
            if(column == 0 && line == 0) stringTable = stringTable + "Code";
            else if (line == 0 && column > 0) stringTable = stringTable + String.fromCharCode(column + 64);
            else if(column == 0) stringTable = stringTable + line;
            else stringTable = stringTable + "<img src = 'images/dontKnow.png' class = 'inputTable' >"

            stringTable = stringTable + "</td>";
        }
        stringTable = stringTable + "</tr>";
    }
    stringTable = stringTable + "</table>";


    document.getElementById("adversaryTable").innerHTML = stringTable;

}

function setPersonalShipPosition(id){
    if (flagChoose == true){
        if(flagShip1Selected == false){
            if(flagShip1 == true ){
                console.log(id);
                console.log(id % (level-1));
                if(id % (level-1)  + 5 <= level){
                    for(var i = id; i< id + 4; i++) personalShipPosition[ship1-1].push(i);
                    rebuildTable2("setPersonalShipPosition");
                    flagShip1Selected = true;
                }
                else{
                    alert("Your ship is bigger than space that you selected. Please select another space!");
                }
            }
        }
        else{
            alert("Ship already selected");
        }
        /*if(personalShipPosition.length < shipCont){
            if(!personalShipPosition.includes(id)){
                personalShipPosition.push(id);
                rebuildTable("setPersonalShipPosition");
            }
            else{
                alert("Ship choosed !");
            }

        }
        else{
            alert("You added more ships than possible!");
        }*/
    }
    else{
        alert("Enable ship selection !");
    }
}

function rebuildTable(fun){
    var stringTable = "<table class = 'table'>";
    for (var line = 0; line < level; line++){
        stringTable = stringTable + "<tr>";

        for (var column = 0; column < level; column++){

            stringTable = stringTable + "<td>";
            
            if(column == 0 && line == 0) stringTable = stringTable + "Code";
            else if (line == 0 && column > 0) stringTable = stringTable + String.fromCharCode(column + 64);
            else if(column == 0) stringTable = stringTable + line;
            else {
                if(personalShipPosition.includes((line-1)*(level-1) + column) == true ) stringTable = stringTable + "<img src = 'images/ship.png' class = 'inputTable' onclick = '"+ fun +"(" + ((line-1)*(level-1) + column) + ")'>";
                else stringTable = stringTable + "<img src = 'images/water.png' class = 'inputTable' onclick = '"+ fun + "(" + ((line-1)*(level-1) + column)  + ")'>";
                
            }
            stringTable = stringTable + "</td>";
        }
        stringTable = stringTable + "</tr>";
    }
    stringTable = stringTable + "</table>";
    document.getElementById("personalTable").innerHTML = stringTable;

    //Adversary table
    stringTable = "<table class = 'table'>";
    for (var line = 0; line < level; line++){
        stringTable = stringTable + "<tr>";

        for (var column = 0; column < level; column++){

            stringTable = stringTable + "<td>";
            
            if(column == 0 && line == 0) stringTable = stringTable + "Code";
            else if (line == 0 && column > 0) stringTable = stringTable + String.fromCharCode(column + 64);
            else if(column == 0) stringTable = stringTable + line;
            else stringTable = stringTable + "<img src = 'images/dontKnow.png' class = 'inputTable' >";
                
            
            stringTable = stringTable + "</td>";
        }
        stringTable = stringTable + "</tr>";
    }
    stringTable = stringTable + "</table>";

    document.getElementById("adversaryTable").innerHTML = stringTable;
}

function shotClick(id){

    if(personalWrongShot.includes(id) || personalRightShot.includes(id)) alert("REALLY? OK, YOUR PROBLEM!!");
    else if(adversaryShipPosition.includes(id)){
        personalRightShot.push(id);
        if(personalRightShot.length >= shipCont){
            document.write("YOU WIN!!!!!!!!");
        }
    }  
    else personalWrongShot.push(id);
    adversaryShot();
    if(adversaryRightShot.length == shipCont ){
        document.write("YOU LOSE!!!!!!!!");
    }
    else{
        rebuildTableGaming("shotClick");
    }
    
}  


function chooseAdversaryShipPosition(){
    for(var i = 0; i < shipCont ; i++){
        var number = parseInt(Math.random()* (Math.pow((level-1),2)) -1) + 1000 + 1;
        if (adversaryShipPosition.includes(number) == false) adversaryShipPosition.push(number);
        else i--;
    }
}

function rebuildTableGaming(fun){
    //Personal table
    var stringTable = "<table class = 'table'>";
    for (var line = 0; line < level; line++){
        stringTable = stringTable + "<tr>";

        for (var column = 0; column < level; column++){

            stringTable = stringTable + "<td>";
            
            if(column == 0 && line == 0) stringTable = stringTable + "Code";
            else if (line == 0 && column > 0) stringTable = stringTable + String.fromCharCode(column + 64);
            else if(column == 0) stringTable = stringTable + line;
            else {
                if(adversaryRightShot.includes((line-1)*(level-1) + column) == true ) stringTable = stringTable + "<img src = 'images/sad.png' class = 'inputTable' >";
                else if(adversaryWrongShot.includes((line-1)*(level-1) + column) == true ) stringTable = stringTable + "<img src = 'images/bomb.png' class = 'inputTable' >";
                else if(personalShipPosition.includes((line-1)*(level-1) + column) == true ) stringTable = stringTable + "<img src = 'images/ship.png' class = 'inputTable' >";
                else stringTable = stringTable + "<img src = 'images/water.png' class = 'inputTable'>";
                
            }
            stringTable = stringTable + "</td>";
        }
        stringTable = stringTable + "</tr>";
    }
    stringTable = stringTable + "</table>";
    document.getElementById("personalTable").innerHTML = stringTable;

    //Adversary table
    stringTable = "<table class = 'table'>";
    for (var line = 0; line < level; line++){
        stringTable = stringTable + "<tr>";

        for (var column = 0; column < level; column++){

            stringTable = stringTable + "<td>";
            
            if(column == 0 && line == 0) stringTable = stringTable + "Code";
            else if (line == 0 && column > 0) stringTable = stringTable + String.fromCharCode(column + 64);
            else if(column == 0) stringTable = stringTable + line;
            else {
                if(personalRightShot.includes((line-1)*(level-1) + column  + 1000) == true ) stringTable = stringTable + "<img src = 'images/happy.png' class = 'inputTable' onclick = '"+ fun +"(" + ((line-1)*(level-1) + column + 1000) + ")'>";
                else if(personalWrongShot.includes((line-1)*(level-1) + column+ 1000) == true ) stringTable = stringTable + "<img src = 'images/sad.png' class = 'inputTable' onclick = '"+ fun + "(" + ((line-1)*(level-1) + column + 1000) + ")'>";
                else stringTable = stringTable + "<img src = 'images/dontKnow.png' class = 'inputTable' onclick = '"+ fun +"(" + ((line-1)*(level-1) + column+1000) + ")'>";
            }
            stringTable = stringTable + "</td>";
        }
        stringTable = stringTable + "</tr>";
    }
    stringTable = stringTable + "</table>";

    document.getElementById("adversaryTable").innerHTML = stringTable;
}

function adversaryShot(){

        var index = parseInt(Math.random()* (adversaryShotPossibilities.length-1) );
        if(personalShipPosition.includes(adversaryShotPossibilities[index])) adversaryRightShot.push(adversaryShotPossibilities[index]);
        else adversaryWrongShot.push(adversaryShotPossibilities[index]);

        adversaryShotPossibilities = removeElement(adversaryShotPossibilities,adversaryShotPossibilities[index]);        
}

function createVectorOfPossibilities(){
    for (var i = 0; i < Math.pow((level-1),2); i++ ) adversaryShotPossibilities.push(i + 1);   
}

function showShips(){
    var stringText;
    for(var i = 1; i<=2; i ++){
        stringText= "<img src = 'images/warShip_"+ i + ".png' width = 65px heigth = 45px  onclick = 'selectShip("+ i +")'>";
        document.getElementById("ship"+i).innerHTML = stringText;
    }
    stringText= "Select ship";
    document.getElementById("shipSelect").innerHTML = stringText;
    
    
}

function selectShip(id){
    
    if(id == ship1){
        flagShip1 = true;
        flagShip2 = false;
        console.log("Id1 selecionado");
    }
    else{
        flagShip1 = false;
        flagShip2 = true;
        console.log("Id2 selecionado");
    }
    
}

//teste
function rebuildTable2(fun){
    var ctr = 1;
    var stringTable = "<table class = 'table'>";
    for (var line = 0; line < level; line++){
        stringTable = stringTable + "<tr>";

        for (var column = 0; column < level; column++){

            stringTable = stringTable + "<td>";
            
            if(column == 0 && line == 0) stringTable = stringTable + "Code";
            else if (line == 0 && column > 0) stringTable = stringTable + String.fromCharCode(column + 64);
            else if(column == 0) stringTable = stringTable + line;
            else {
                //Arrumar aqui
                if(personalShipPosition[0].includes((line-1)*(level-1) + column) == true ){
                    stringTable = stringTable + "<img src = 'images/ship1_p"+ctr+".png' class = 'inputTable' onclick = '"+ fun +"(" + ((line-1)*(level-1) + column) + ")'>";
                    ctr ++;
                } 
                else stringTable = stringTable + "<img src = 'images/water.png' class = 'inputTable' onclick = '"+ fun + "(" + ((line-1)*(level-1) + column)  + ")'>";
                
            }
            stringTable = stringTable + "</td>";
        }
        stringTable = stringTable + "</tr>";
    }
    stringTable = stringTable + "</table>";
    document.getElementById("personalTable").innerHTML = stringTable;

    //Adversary table
    stringTable = "<table class = 'table'>";
    for (var line = 0; line < level; line++){
        stringTable = stringTable + "<tr>";

        for (var column = 0; column < level; column++){

            stringTable = stringTable + "<td>";
            
            if(column == 0 && line == 0) stringTable = stringTable + "Code";
            else if (line == 0 && column > 0) stringTable = stringTable + String.fromCharCode(column + 64);
            else if(column == 0) stringTable = stringTable + line;
            else {
                if(personalShipPosition.includes((line-1)*(level-1) + column  + 1000) == true ) stringTable = stringTable + "<img src = 'images/ship.png' class = 'inputTable' onclick = '"+ fun +"(" + ((line-1)*(level-1) + column) + ")'>";
                else stringTable = stringTable + "<img src = 'images/dontKnow.png' class = 'inputTable' >";
                
            }
            stringTable = stringTable + "</td>";
        }
        stringTable = stringTable + "</tr>";
    }
    stringTable = stringTable + "</table>";

    document.getElementById("adversaryTable").innerHTML = stringTable;
}


