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
let qtdShips = 2;
var flagShip = [];


function initShipPosition(){
    for(var i = 0; i< qtdShips; i++){
        personalShipPosition[i] = [];
        adversaryShipPosition[i] = [];
        flagShip[i] = [];
    } 
    for(var i = 0; i<qtdShips; i ++){
        for(var j = 0; j< qtdShips; j ++)flagShip[i][j] = false;
    }
}

function resetGame(){

    initShipPosition();
    //personalShipPosition = [];
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
    initShipPosition();
    alert("Control message!");
}

function starGame(){
    var flagCtr = true;
    if(!flagGame){
        for(var index = 0; index <qtdShips;index++){
            if(flagShip[index][0]==false)flagCtr=false;
        }
        if(flagCtr){
            rebuildTableGaming("shotClick");
            chooseAdversaryShipPosition();
            createVectorOfPossibilities();
            flagGame = true;
            flagChoose = false;
        }
        else{
            flagCtr = true;
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
    var flagCtr = false;
    if (flagChoose == true){
        for(var index = 0; index <qtdShips; index ++){
            if(flagShip[index][0] == false){
                if(flagShip[index][1] == true ){

                    if(id % (level-1)  + 4 <= level){
                        for(var qtd = 0; qtd < qtdShips; qtd ++){
                                if(personalShipPosition[qtd].includes(id) )flagCtr = true;
                        }
                        if(!flagCtr){
                            for(var i = id; i< id + 4; i++) personalShipPosition[index].push(i);
                            rebuildTable2("setPersonalShipPosition");
                            flagShip[index][0] = true;
                        }
                        else{
                            alert("Space already occupied!!");
                            flagCtr = false;
                        }

                    }
                    else{
                        alert("Your ship is bigger than space that you selected. Please select another space!");
                    }
                }
            }
            else{
                //alert("Ship already selected");
            }
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

    checkPersonalShot(id);
    if(personalRightShot.length == qtdShips*4){
        document.write("YOU WIN!!!!!!!!");
    }
    else{
        adversaryShot();
        if(adversaryRightShot.length == qtdShips*4 ){
            document.write("YOU LOSE!!!!!!!!");
        }
        else{
            rebuildTableGaming("shotClick");
        }
    }

}  

function checkPersonalShot(id){
    flagCtr = false;
    for(index = 0; index < qtdShips; index++){
        if(adversaryShipPosition[index].includes(id)) flagCtr = true;
    }
    if(personalWrongShot.includes(id) || personalRightShot.includes(id)){
        alert("REALLY? OK, YOUR PROBLEM!!");
        return;
    } 
    if(flagCtr)personalRightShot.push(id);
    else personalWrongShot.push(id);
}


function chooseAdversaryShipPosition(){
    var flagCtr = true;
    for (var index = 0; index < qtdShips; index ++){
        var number = parseInt(Math.random()* (Math.pow((level-1),2)) -1)  + 1;
        if(number%(level-1) +4 < level-1 && number%(level-1) !=0){
            //
            for(var k = 0; k<=index; k++)
            {
                if(adversaryShipPosition[k].includes(number+1000)) flagCtr = false;
            }
            if(flagCtr){
                for(var i = number; i<number+4; i++) adversaryShipPosition[index].push(i+1000);
                console.log(number);
                console.log(number%(level-1) +4);
            }
            else index --; 
        }
        else{
            index--;
        }
    }
    console.log(adversaryShipPosition[0]);
    console.log(adversaryShipPosition[1]);
    //var number = parseInt(Math.random()* (Math.pow((level-1),2)) -1)  + 1;
    /*for(var i = 0; i < shipCont ; i++){
        var number = parseInt(Math.random()* (Math.pow((level-1),2)) -1) + 1000 + 1;
        if (adversaryShipPosition.includes(number) == false) adversaryShipPosition.push(number);
        else i--;
    }*/
}

function rebuildTableGaming(fun){
    var shipHit = [];
    var flagCtr = false;
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
                //Check if the ship has been hit
                for(var i = 0; i<qtdShips; i++){
                    if(personalShipPosition[i].includes( (line-1)*(level-1) + column)   ){
                        shipHit[0] = i;
                        shipHit[1] = personalShipPosition[i].indexOf( (line-1)*(level-1) + column );
                        flagCtr = true;
                    }
                }
                if(adversaryRightShot.includes((line-1)*(level-1) + column) == true ) stringTable = stringTable + "<img src = 'images/sad.png' class = 'inputTable' >";
                else if(adversaryWrongShot.includes((line-1)*(level-1) + column) == true ) stringTable = stringTable + "<img src = 'images/bomb.png' class = 'inputTable' >";
                else if(flagCtr) stringTable = stringTable + "<img src = 'images/ship"+(shipHit[0]+1)+"_p"+(shipHit[1]+1)+".png' class = 'inputTable' >";
                else stringTable = stringTable + "<img src = 'images/water.png' class = 'inputTable'>";
                flagCtr = false;
                
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
                //
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
    var flagCtr = false;
    var index = parseInt(Math.random()* (adversaryShotPossibilities.length-1) );
    for(var i = 0; i< qtdShips; i++){
        if(personalShipPosition[i].includes(adversaryShotPossibilities[index])){
            adversaryRightShot.push(adversaryShotPossibilities[index]);
            flagCtr = true;
        } 
    }
   
    if(!flagCtr)adversaryWrongShot.push(adversaryShotPossibilities[index]);
    flagCtr = false;
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
    
    for(var index = 0; index <qtdShips; index ++){
        if(id == index+1){
            flagShip[index][1] = true;
            console.log("Id1 selecionado");
        }
        else{
            flagShip[index][1] = false;
            console.log("Id2 selecionado");
        }
    }
    
}

//teste
function rebuildTable2(fun){
    var flag = false;
    var ctr = [];

    ///
    for(var index = 0; index <qtdShips; index ++) ctr[index] = 1;
    ///
    var stringTable = "<table class = 'table'>";
    for (var line = 0; line < level; line++){
        stringTable = stringTable + "<tr>";

        for (var column = 0; column < level; column++){

            stringTable = stringTable + "<td>";
            
            if(column == 0 && line == 0) stringTable = stringTable + "Code";
            else if (line == 0 && column > 0) stringTable = stringTable + String.fromCharCode(column + 64);
            else if(column == 0) stringTable = stringTable + line;
            else {
                for(var index = 0; index <qtdShips; index ++){
                    if(personalShipPosition[index].includes((line-1)*(level-1) + column) == true ){
                        stringTable = stringTable + "<img src = 'images/ship"+(index+1)+"_p"+ctr[index]+".png' class = 'inputTable' onclick = '"+ fun +"(" + ((line-1)*(level-1) + column) + ")'>";
                        ctr[index] ++;
                        flag = true;
                    }
                }

                if(!flag) stringTable = stringTable + "<img src = 'images/water.png' class = 'inputTable' onclick = '"+ fun + "(" + ((line-1)*(level-1) + column)  + ")'>";
                flag = false;
                
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


