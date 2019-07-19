#pragma strict

var Vida = 100; //vida total del enemigo

function Update () {

if(Vida <=0){       //si la vida es menor o igual a 0
Destroy(gameObject);//el enemigo se destruye
}
}

function FV (Dano : int) {
Vida -= Dano;
}