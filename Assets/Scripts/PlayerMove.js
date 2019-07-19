
var speed : float;//velocidad normal
var slowSpeed : float;//velocidad al apuntar
private var normalSpeed : float;

var gravity : float = 20.0;

private var Apuntando : boolean; // estoy apuntando? true or false 
private var Disparando : boolean; // estoy disparando? true or false 

    var puntoCamW : Transform;
	var DirectS : Transform;
	var DirectA : Transform;
	var DirectD : Transform;

var smooth = 0.3; // velocidad a la que rota el player. Lo recomiendo a 0.1

	private var yVelocityW = 0.0;
	private var yAngleW : float;

	private var yVelocityS = 0.0;
	private var yAngleS : float;

	private var yVelocityA = 0.0;
	private var yAngleA : float;

	private var yVelocityD = 0.0;
	private var yAngleD : float;

private var moveDirection : Vector3 = Vector3.zero;


private var XW : boolean;//estoy clicando tecla W
private var XA : boolean;//estoy clicando tecla A
private var XS : boolean;//estoy clicando tecla S
private var XD : boolean;//estoy clicando tecla D


function Start() {
Apuntando = false;
Disparando = false;

normalSpeed = speed;
}


function Update() {

var controller : CharacterController = GetComponent.<CharacterController>();

if (controller.isGrounded) {

			moveDirection = Vector3(Input.GetAxis("Horizontal"), 0,Input.GetAxis("Vertical"));
			moveDirection = puntoCamW.TransformDirection(moveDirection);
			moveDirection *= speed;


			yAngleW = Mathf.SmoothDampAngle(transform.eulerAngles.y,puntoCamW.eulerAngles.y, yVelocityW, smooth);

			if(Input.GetButton("Fire1") || Input.GetButton("Fire2")){
			transform.rotation = Quaternion.Euler(0, yAngleW, 0);	
			}

			if(Input.GetKey("w") && XS == false){
			transform.rotation = Quaternion.Euler(0, yAngleW, 0);	
			}

			yAngleS = Mathf.SmoothDampAngle(transform.eulerAngles.y,DirectS.eulerAngles.y, yVelocityS, smooth);

			if(Input.GetKey("s") && Disparando == false && Apuntando == false && XW == false){
			transform.rotation = Quaternion.Euler(0, yAngleS, 0);
			}



			yAngleA = Mathf.SmoothDampAngle(transform.eulerAngles.y,DirectA.eulerAngles.y, yVelocityA, smooth);

			if(Input.GetKey("a") && Disparando == false && Apuntando == false && XD == false){
			transform.rotation = Quaternion.Euler(0, yAngleA, 0);
			}


			yAngleD = Mathf.SmoothDampAngle(transform.eulerAngles.y,DirectD.eulerAngles.y, yVelocityD, smooth);

			if(Input.GetKey("d") && Disparando == false && Apuntando == false && XA == false){
			transform.rotation = Quaternion.Euler(0, yAngleD, 0);
			}
			}
			





if(Input.GetButton("Fire2")){
Apuntando = true;
speed = slowSpeed;
} else {
Apuntando = false;
speed = normalSpeed;
}

if(Input.GetButton("Fire1")){
Disparando = true;
} else {
Disparando = false;
}

if(Input.GetKey("w")){
XW = true;
}else{
XW = false;
}
if(Input.GetKey("a")){
XA = true;
}else{
XA = false;
}
if(Input.GetKey("d")){
XD = true;
}else{
XD = false;
}
if(Input.GetKey("s")){
XS = true;
}else{
XS = false;
}

moveDirection.y -= gravity * Time.deltaTime;		
controller.Move(moveDirection * Time.deltaTime);
}