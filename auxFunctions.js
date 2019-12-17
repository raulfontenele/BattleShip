function removeElement(vector, element){
    var index = vector.indexOf(element);
    for (var i = index; i < vector.length - 1; i++){
        vector[i] = vector[i+1];
    }
    vector.pop();
    return vector;
}