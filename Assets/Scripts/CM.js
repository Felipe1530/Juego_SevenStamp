#pragma strict
// Con este script podemos saber si el player esta tocando el collider de la municion, si CM es
// true significa que la estamos tocando si es false que no la estamos tocando. 
var CM : boolean; 

function Start () {
CM = false;
}

function OnTriggerEnter (other : Collider) {
if(other.tag == "CajaMuni"){
CM = true;
}
}

function OnTriggerExit (other : Collider) {
if(other.tag == "CajaMuni"){
CM = false;
}
}