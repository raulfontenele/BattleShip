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
const level1 = 9;
const level2 = 14;
const level3 = 18;
var qtdShips ;
const qtdTotalShips = 4;
var flagShip = [];
var flagHits = [];
var contShots = 0;
var shipSelect =[];

function initFlagHits(){
    //check first shot
    flagHits[0] = false;
    //check second shot
    //flagHits[1] = false;
    //check complet shot
    //flagHits[2] = false;
}


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
    personalRightShot = [];
    personalWrongShot = [];
    adversaryRightShot = [];
    adversaryWrongShot = [];
    adversaryShotPossibilities = [];
    flagGame = false;
    shipCont = 0;
    shipSelect = [];
}

function setLevel1(){
    level = level1;
    //shipCont = 5;
    qtdShips = 2;
    createTable(level,"setPersonalShipPosition");
    resetGame();
    alert("In these level, you must select "+qtdShips+" ships!");

}
function setLevel2(){
    level = level2;
    //shipCont = 7;
    qtdShips = 3;
    createTable(level,"setPersonalShipPosition");
    resetGame();
    alert("In these level, you must select "+qtdShips+" ships!");

}
function setLevel3(){
    level = level3;
    //shipCont = 9;
    qtdShips = 4;
    createTable(level,"setPersonalShipPosition");
    resetGame();
    alert("In these level, you must select "+qtdShips+" ships!");
}

function setFlagChoose(){
    flagChoose = true;
    showShips();
    initShipPosition();
    alert("You must select the left-most corner from where the ship will be positioned.");
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
                            flagShip[shipCont][0] = true;
                            shipCont ++;
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
        //document.write("YOU WIN!!!!!!!!");
        youWin();
    }
    else{
        if(level == level1){
            if(adversaryRightShot.length > 0){
                adversaryShot(adversaryRightShot[adversaryRightShot.length -1]-1,false);
            }
            else{
                adversaryShot(0,false);
            }
        }
        else{
            if((contShots < 9 && level==level2) || (contShots < 7 && level==level)){
                if(adversaryRightShot.length > 0){
                    adversaryShot(adversaryRightShot[adversaryRightShot.length -1]-1,false);
                }
                else{
                    adversaryShot(0,false); 
                }
            }
            else{
                adversaryShot(searchValueToShot(),true);
                contShots = 0;
            }

        }

        if(adversaryRightShot.length == qtdShips*4 ){
            //document.write("YOU LOSE!!!!!!!!");
            youLose();
        }
        else{
            rebuildTableGaming("shotClick");
        }
    }
    function searchValueToShot(){
        for(var i = 0;i<qtdShips; i++){
            for(var j = 0; j<4; j++){
                if(!adversaryRightShot.includes(personalShipPosition[i][j]) ){
                    return personalShipPosition[i][j];
                } 
            }
        }
    }

}  
function youLose(){
    var stringText = "<h1 font-size: '60px' margin = '10px' >YOU LOSE :)</h1>"+
    "<img src = 'images/youLose.jpg'>";
    document.write(stringText);
}
function youWin(){
    var stringText = "<h1 font-size: '60px' margin = '10px' >YOU WIN :)</h1>"+
    "<img src = 'images/youWin.png'>";
    document.write(stringText);
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

function checkAdversaryShot(id){
    var flagCtr = false;
    for(var i = 0; i< qtdShips; i++){
        if(personalShipPosition[i].includes(id)){
            adversaryRightShot.push(id);
            flagCtr = true;
            return true;
        } 
    }
    if(!flagCtr){
        adversaryWrongShot.push(id);
        adversaryShotPossibilities = removeElement(adversaryShotPossibilities,id);
        return false;
    }
}

function verifyShipsAlive(id){
    for(var i = 0; i<qtdShips; i++){
        if(personalShipPosition[i].includes(id)){
            for(var j = 0; j <4 ; j++){
                if(!adversaryRightShot.includes(personalShipPosition[i][j]) ) return false;
            }
        }
    }
    return true;
}

function adversaryShot(id, flag){
    if(flagHits[0]){
        if(adversaryRightShot.includes(id) || adversaryWrongShot.includes(id)){
            if(id%(level-1)==0){
                adversaryShot(id+1,false);
            }
            else{ 
                adversaryShot(id+1,false);
            }
        }
        else{
            if(id < 0){
                adversaryShot(id+1,false);
            }
            else if(id%(level-1)==0){
                adversaryShot(id+1,false);
            }
            else{
                if(checkAdversaryShot(id)){
                    if(verifyShipsAlive(id)){
                        flagHits[0] = false;
                    }
                }
                else contShots ++; 
            }

        }
    }
    else{
        if(!flag){
            var index = parseInt(Math.random()* (adversaryShotPossibilities.length-1) );
            if(checkAdversaryShot(adversaryShotPossibilities[index])) flagHits[0] = true;
            else contShots ++;
        }
        else{
            if(checkAdversaryShot(id)) flagHits[0] = true;
        }
    }
}



function chooseAdversaryShipPosition(){
    var flagCtr = true;
    for (var index = 0; index < qtdShips; index ++){
        var number = parseInt(Math.random()* (Math.pow((level-1),2)) -1)  + 1;
        if(number%(level-1) +4 < level-1 && number%(level-1) !=0){
            for(var k = 0; k<=index; k++)
            {
                if(adversaryShipPosition[k].includes(number+1000)) flagCtr = false;
            }
            if(flagCtr){
                for(var i = number; i<number+4; i++) adversaryShipPosition[index].push(i+1000);
            }
            else index --; 
        }
        else{
            index--;
        }
    }
    for(var i = 0; i< qtdShips; i++){
        console.log(adversaryShipPosition[i]);
    }

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
                        shipHit[0] = shipSelect[i];
                        shipHit[1] = personalShipPosition[i].indexOf( (line-1)*(level-1) + column );
                        flagCtr = true;
                    }
                }
                if(adversaryRightShot.includes((line-1)*(level-1) + column) == true ) stringTable = stringTable + "<img src = 'images/sad.png' class = 'inputTable' >";
                else if(adversaryWrongShot.includes((line-1)*(level-1) + column) == true ) stringTable = stringTable + "<img src = 'images/bomb.png' class = 'inputTable' >";
                else if(flagCtr) stringTable = stringTable + "<img src = 'images/ship"+(shipHit[0])+"_p"+(shipHit[1]+1)+".png' class = 'inputTable' >";
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



function createVectorOfPossibilities(){
    for (var i = 0; i < Math.pow((level-1),2); i++ ) adversaryShotPossibilities.push(i + 1);   
}

function showShips(){
    var stringText;
    for(var i = 1; i<=qtdTotalShips; i ++){
        stringText= "<img src = 'images/warShip_"+ i + ".png' width = 65px heigth = 45px  onclick = 'selectShip("+ i +")'>";
        document.getElementById("ship"+i).innerHTML = stringText;
    }
    stringText= "Select ship";
    document.getElementById("shipSelect").innerHTML = stringText;
    
    
}

function selectShip(id){
    if(shipCont<qtdShips){
        for(var index = 0; index <qtdTotalShips; index ++){
            if(id == index+1){
                flagShip[shipCont][1] = true;
                shipSelect[shipCont] = id;

                //console.log("Id1 selecionado");
            }
            /*else{
                flagShip[index][1] = false;
                //console.log("Id2 selecionado");
            }*/
        }

        for(var i = 0; i < qtdShips; i++){
            if(i !=shipCont) flagShip[i][1] = false;
        }
    }
    else{
        alert("You already added the number of ships allowed at this level!");
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
                        stringTable = stringTable + "<img src = 'images/ship"+shipSelect[index]+"_p"+ctr[index]+".png' class = 'inputTable' onclick = '"+ fun +"(" + ((line-1)*(level-1) + column) + ")'>";
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


