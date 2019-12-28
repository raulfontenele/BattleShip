function removeElement(vector, element){
    var index = vector.indexOf(element);
    for (var i = index; i < vector.length - 1; i++){
        vector[i] = vector[i+1];
    }
    vector.pop();
    return vector;
}

function showInstrutions(){
    var stringInfo = "<h3> Welcome to the battleship game!</h3>"+   
                     "<h4> How to play:</h4>"+
                     "<p class = 'text-justify'>To start the game, you must initially select the level you would like to play. Then select the ships you will use one at a time by clicking on the ship and then on the leftmost coordinate it will be. " +
                     "Remember that each ship occupies 4 spaces on the board. After selecting all the ships, simply press the start button and select the click on the space you want to fire. <br>"+
                     "Good lucky, you'll need it !</p>";
    document.getElementById("info").innerHTML = stringInfo;
}

function cleanInstrutions(){
    document.getElementById("info").innerHTML = "";
}