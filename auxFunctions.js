function removeElement(vector, element){
    var index = vector.indexOf(element);
    for (var i = index; i < vector.length - 1; i++){
        vector[i] = vector[i+1];
    }
    vector.pop();
    return vector;
}

function convertNum2Coor(vector,level){
    var line;
    var column;
    var coor = [];
    
    for(var i = 0; i< vector.length; i++){
        if((vector[i]-1000)%(level-1) == 0) line = (vector[i]-1000)/(level-1);
        else line = parseInt((vector[i]-1000)/(level-1))+1;
        column = (vector[i]-1000) - (line-1)*(level-1);
        coor.push( String.fromCharCode(column + 64) + line);
    }
    return coor;
}

function showInstrutions(){
    var stringInfo = "<h3> Welcome to the battleship game!</h3>"+   
                     "<h4> How to play:</h4>"+
                     "<p class = 'text-justify'>To start the game, you must initially select the level you would like to play. Then select the ships you will use one at a time by clicking on the ship and then on the leftmost coordinate it will be. " +
                     "Remember that each ship occupies 4 spaces on the board. After selecting all the ships, simply press the start button and select the click on the space you want to fire. <br>"+
                     "Good lucky, you'll need it !</p>"+
                     "<h4> Simbols:</h4>"+
                     "<p class = 'align-left'><br><img src = 'images/sad.png' width = 15px heigth = 15px> This symbol on your board means that you have been hit, and that of the opponent, that you missed the shot.<br>"+
                     "<img src = 'images/happy.png' width = 15px heigth = 15px> This symbol means that you hit the shot.<br>"+
                     "<img src = 'images/bomb.png' width = 15px heigth = 15px> This symbol means that your opponent missed the shot.<br></p>"
    document.getElementById("info").innerHTML = stringInfo;
}

function cleanInstrutions(){
    document.getElementById("info").innerHTML = "";
}