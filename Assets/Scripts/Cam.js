#pragma strict

private var camActualPos : Vector3; // La posicion actual de la camera
var camNormal : Vector3; // Posicion de la camera
var camApuntando : Vector3; // Posicion de la camera cuando estamos apuntando

private var VelocidadX = 0.4;  
private var VelocidadY = 0.4;
private var VelocidadZ = 0.4;

function Start (){
transform.localPosition = camNormal;
}

function Update () {

 var newX = Mathf.SmoothDamp(transform.localPosition.x, camActualPos.x, VelocidadX, .1);
 var newY = Mathf.SmoothDamp(transform.localPosition.y, camActualPos.y, VelocidadY, .1);
 var newZ = Mathf.SmoothDamp(transform.localPosition.z, camActualPos.z, VelocidadZ, .1);

 transform.localPosition.x = newX;
 transform.localPosition.y = newY;
 transform.localPosition.z = newZ;

if(Input.GetButton("Fire2")){
   camActualPos.x = camApuntando.x;
   camActualPos.y = camApuntando.y;
   camActualPos.z = camApuntando.z;
} else {
   camActualPos.x = camNormal.x;
   camActualPos.y = camNormal.y;
   camActualPos.z = camNormal.z;
}
}