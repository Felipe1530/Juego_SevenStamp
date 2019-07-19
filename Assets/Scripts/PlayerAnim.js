#pragma strict

var AnimatorPlayer : Animator;// Poner el animator del player

private var correr : boolean;// estoy moviendome true or false?
private var apuntar : boolean;// estoy apuntando true or false?

private var XW : boolean;// estoy llendo hacia ADELANTE-----(w) true or false?
private var XS : boolean;// estoy llendo hacia ATRAS--------(s) true or false?
private var XA : boolean;// estoy llendo hacia la IZQUIERDA-(a) true or false?
private var XD : boolean;// estoy llendo hacia la DERECHA---(d) true or false?

private var WS : float;
private var AD : float;
private var SDAW : float;
private var SADW : float;

private var XWA : boolean;// estoy llendo hacia ADELANTE y IZQUIERDA (w, a)
private var XAS : boolean;// estoy llendo hacia IZQUIERDA y ATRAS (a, s)
private var XSD : boolean;// estoy llendo hacia ATRAS y DERECHA (s, d)
private var XDW : boolean;// estoy llendo hacia DERECHA y ADELANTE (d, w)

private var DT : boolean; // restriccion dos teclas


function Start () {
correr = false;
apuntar = false;

XW = false;
XS = false;
XA = false;
XD = false;

XWA = false;
XAS = false;
XSD = false;
XDW = false;

DT = false;
}

function Update () {

if(Input.GetKey("w") || Input.GetKey("a") || Input.GetKey("s") || Input.GetKey("d")){
correr = true;
AnimatorPlayer.SetBool("correr", true);

AnimatorPlayer.SetBool("apuntarcaminarws", false);
AnimatorPlayer.SetBool("apuntarcaminarad", false);
AnimatorPlayer.SetBool("apuntarcaminarsdaw", false);
AnimatorPlayer.SetBool("apuntarcaminarsadw", false);
} else {
correr = false;
AnimatorPlayer.SetBool("correr", false);
}

if(Input.GetButton("Fire2") || Input.GetButton("Fire1")) {
apuntar = true;
AnimatorPlayer.SetBool("apuntar", true);

AnimatorPlayer.SetBool("apuntarcaminarws", false);
AnimatorPlayer.SetBool("apuntarcaminarad", false);
AnimatorPlayer.SetBool("apuntarcaminarsdaw", false);
AnimatorPlayer.SetBool("apuntarcaminarsadw", false);
} else {
apuntar = false;
AnimatorPlayer.SetBool("apuntar", false);
DT = false;
}





if(correr == true && apuntar == true){ //correr es = a estar moviendose con una de las siguientes teclas(w,a,s,d).
                                       //apuntar es = a estar clicando clic derecho o izquierdo del raton.

//UNA TECLA
if(XW == true && DT == false){
AnimatorPlayer.SetBool("apuntarcaminarws", true);
AnimatorPlayer.SetFloat("ws", WS);
WS = 1;
}

if(XS == true && DT == false){
AnimatorPlayer.SetBool("apuntarcaminarws", true);
AnimatorPlayer.SetFloat("ws", WS);
WS = -1;
}

if(XA == true && DT == false){
AnimatorPlayer.SetBool("apuntarcaminarad", true);
AnimatorPlayer.SetFloat("ad", AD);
AD = -1;
}

if(XD == true && DT == false){
AnimatorPlayer.SetBool("apuntarcaminarad", true);
AnimatorPlayer.SetFloat("ad", AD);
AD = 1;
}


//DOS TECLAS
if(XWA == true){
AnimatorPlayer.SetBool("apuntarcaminarsdaw", true);
AnimatorPlayer.SetFloat("sdaw", SDAW);
SDAW = 1;
DT = false;
}

if(XAS == true){
AnimatorPlayer.SetBool("apuntarcaminarsadw", true);
AnimatorPlayer.SetFloat("sadw", SADW);
SADW = 1;
DT = false;
}

if(XSD == true){
AnimatorPlayer.SetBool("apuntarcaminarsdaw", true);
AnimatorPlayer.SetFloat("sdaw", SDAW);
SDAW = -1;
DT = false;
}

if(XDW == true){
AnimatorPlayer.SetBool("apuntarcaminarsadw", true);
AnimatorPlayer.SetFloat("sadw", SADW);
SADW = -1;
DT = false;
}





AnimatorPlayer.SetBool("correr", false);
AnimatorPlayer.SetBool("apuntar", false);
}else{
AnimatorPlayer.SetBool("apuntarcaminarws", false);
AnimatorPlayer.SetBool("apuntarcaminarad", false);
AnimatorPlayer.SetBool("apuntarcaminarsdaw", false);
AnimatorPlayer.SetBool("apuntarcaminarsadw", false);
}




if(Input.GetKey("w") && XS == false){
XW = true;
}else{
XW = false;
}
if(Input.GetKey("a") && XD == false){
XA = true;
}else{
XA = false;
}
if(Input.GetKey("d") && XA == false){
XD = true;
}else{
XD = false;
}
if(Input.GetKey("s") && XW == false){
XS = true;
}else{
XS = false;
}




if(Input.GetKey("w") && Input.GetKey("a")){
XWA = true;
DT = true;
}else{
XWA = false;
}

if(Input.GetKey("a") && Input.GetKey("s")){
XAS = true;
DT = true;
}else{
XAS = false;
}

if(Input.GetKey("s") && Input.GetKey("d")){
XSD = true;
DT = true;
}else{
XSD = false;
}

if(Input.GetKey("d") && Input.GetKey("w")){
XDW = true;
DT = true;
}else{
XDW = false;
}
}
