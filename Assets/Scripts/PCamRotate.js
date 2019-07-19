#pragma strict

var player : Transform; // Aqui ponemos el player

var lookSensivity : float; //sensibilidad de la camera
var Min : float;// La rotacion maxima de la camera hacia arriba, yo lo recomiendo a 20.
var Max : float;// La rotacion maxima de la camera hacia abajo, yo lo recomiendo a 70.
var smoothTime : float; // Cuando mas bajo sea este numero mas rapido seguira la camera al player. Recomiendo poner un 0.05


private var lookSensivity1 : float;
private var xRotation : float;
private var yRotation : float;
private var velocity = Vector3.zero;

function Start () {
lookSensivity1 = lookSensivity;
}

function Update () {

yRotation += Input.GetAxis("Mouse X") * lookSensivity;
xRotation -= Input.GetAxis("Mouse Y") * lookSensivity;

xRotation = Mathf.Clamp(xRotation, -Min, Max);//poner limite en el eje de rotacion X

transform.rotation = Quaternion.Euler(xRotation, yRotation, 0);

var targetPosition : Vector3 = player.TransformPoint(Vector3(0, 2, 0));//para que la camera siga al player
transform.position = Vector3.SmoothDamp(transform.position, targetPosition,velocity, smoothTime);


if(Input.GetButton("Fire1") || Input.GetButton("Fire2")){// Si doy clic derecho o izquierdo al raton
lookSensivity = 1;//La sensibilidad de la camera bajara a 1, lo podeis cambiar a vuestro gusto
}else{
lookSensivity = lookSensivity1;
}
}