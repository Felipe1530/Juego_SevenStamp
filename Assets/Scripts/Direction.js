#pragma strict
//Este script sirve para poder rotar el objeto llamado Direct
var camrotate : PCamRotate;//Aqui ponemos el script llamado PCamRotate
private var yRotation : float;

function Update () {

yRotation += Input.GetAxis("Mouse X") * camrotate.lookSensivity;
transform.rotation = Quaternion.Euler(0, yRotation, 0);

}