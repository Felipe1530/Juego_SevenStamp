#pragma strict

var ScriptCM : CM;//poner script llamado CM. Script CM sive para detectar si estamos tocando el collider de la municion

private var Cargador : int;
private var MunicionTotal : int;
private var SistemaCarga : int;
private var ControlSistemaCarga : boolean;

var MaximoBalasCargador : int;  // balas del cargador
var MaximoBalasTotales  : int;  // balas totales
private var MaximoCargadorMenos1 : int; // balas de cargador -1 PRIVATE
var MuniSuelo : int; // balas que se recargan al passar por el tag CajaMuni

private var TiempoDisparo : float;
private var TiempoDisparoB : boolean;

var CargarUI : UI.Image; //Icono que indica si estamos cargando el arma.

var Mira : UI.Image;     // Mira
var MiraImpacto : UI.Image;  // mira al impacat contra enemigo

var CargadorText : UI.Text;   // texto de las balas del cargador
var MunicionTotalText : UI.Text;  // texto de las balas totales

var SonidoDisparar : AudioClip;  // audio al disparar
var SonidoRecargar : AudioClip;  // audio al recargar
var AudioImpacto : AudioClip;   //audio al impactar contra enemigo
private var B : boolean;


var TextoRojo : int;
private var TextoBlanco : int;
var ColorTextoMenosBalas : Color;  // el color del texto del cargador al tener menos de 10 balas
var ColorTextoMasBalas : Color;  // el color del texto del cargador al dener mas de 11 balas

var Destello : GameObject;

private var BloqueoDelDisparo : boolean; // para no poder disparar mientras recargas
private var RecargaAutomatica : boolean; // para que la recarga automatica funcione bien

var Impacto0 : GameObject;
var Impacto1 : GameObject;

var Distancia : int;  // la distancia a la que llega el arma
var Dano : int;  // el daño que hace el arma

var DuracionRecarga : float; // el tiempo que dura la animcaion de recarga

var TiempoEntreBala : float;
var TiempoDestello : float;

private var ShotPlay : boolean;
var TiempoShot : float;//tiempo que tardas en poder disparar cuando empieza la partida

private var ControlApuntar : boolean;
private var ControlBalas : boolean;

function OnEnable () {
Invoke("TP", TiempoShot);
ShotPlay = false;
}

function OnDisable () {
ShotPlay = false;
}

function Start () {
ShotPlay = false;
TextoBlanco = TextoRojo; 
TextoBlanco += 1;
MaximoCargadorMenos1 = MaximoBalasCargador;
MaximoCargadorMenos1 -= 1;
Cargador = MaximoBalasCargador;  // cargador empieza con 30 balas
MunicionTotal = MaximoBalasTotales;  // la municion total empieza con 90 balas
SistemaCarga = 0; // NO TOCAR
TiempoDisparoB = true; // NO TOCAR
Mira.enabled = true;  // NO TOCAR
MiraImpacto.enabled = false;  // NO TOCAR
Destello.SetActive(false); // NO TOCAR
BloqueoDelDisparo = true;  // NO TOCAR
RecargaAutomatica = true;  // NO TOCAR
B = true;
ControlSistemaCarga = false;
CargarUI.enabled = false;
}

function Update () {

if(MunicionTotal == MaximoBalasTotales){
ControlBalas = false;
}

if(MunicionTotal < MaximoBalasTotales){
ControlBalas = true;
}


CargadorText.text = Cargador.ToString();
MunicionTotalText.text = MunicionTotal.ToString();

if(TiempoDisparoB == false){
TiempoDisparo += Time.deltaTime;
}
if(TiempoDisparo >= TiempoEntreBala){ // Tiempo de disparo, tiempo entre disparo y disparo 
TiempoDisparo = 0;
TiempoDisparoB = true;

}

if(TiempoDisparo >= TiempoDestello){ // Tiempo que tarda a desactivarse el destello 
Destello.SetActive(false);
MiraImpacto.enabled = false;
}

//LIMITES DE CARGADOR
if(Cargador <= 0){
Cargador = 0;
}
if(Cargador >= MaximoBalasCargador){  // poner numero del maximo de balas del cargador 
Cargador = MaximoBalasCargador;       // poner numero del maximo de balas del cargador 
}
//COLOR TEXTO BALAS cargador
if(Cargador <= TextoRojo){    //Cuando el numero de balas sea menor de 10
CargadorText.color = ColorTextoMenosBalas;
}
if(Cargador >= TextoBlanco){   //Cuando el numero de balas sea mayor de 11
CargadorText.color = ColorTextoMasBalas;
}

//COLOR TEXTO BALAS municiontotal
if(MunicionTotal <= TextoRojo){    //Cuando el numero de balas sea menor de 10
MunicionTotalText.color = ColorTextoMenosBalas;
}
if(MunicionTotal >= TextoBlanco){   //Cuando el numero de balas sea mayor de 11
MunicionTotalText.color = ColorTextoMasBalas;
}

//LIMITES DE SISTEMA DE CARGA 

if(SistemaCarga <= 0){
SistemaCarga = 0;
}
if(SistemaCarga >= MaximoBalasCargador){ 
SistemaCarga = MaximoBalasCargador; 
}
//LIMITES DE MUNICION TOTAL
if(MunicionTotal <= 0){
MunicionTotal = 0;
}


if(Input.GetButton("Fire1") && Cargador >= 1 && TiempoDisparoB == true && BloqueoDelDisparo == true && ShotPlay == true){// Disparar
TiempoDisparoB = false;
Cargador -= 1;
SistemaCarga += 1;
Destello.SetActive(true);
GetComponent.<AudioSource>().PlayOneShot(SonidoDisparar);

var R : RaycastHit;  // Raycast 
var P = transform.position;  //Posicion desde donde sale el Raycastvar P = transform.parent.position;
var D = transform.TransformDirection(Vector3.forward);  // Forward, las balas van hacia delante

if(Physics.Raycast(P,D,R,Distancia)){       
var rotation = Quaternion.FromToRotation(Vector3.up, R.normal);

if(R.collider.tag == "Pared"){      // Si el raycast esta tocando un collider con el tag Pared    
Instantiate(Impacto0,R.point,rotation);   // Se instancia el decal
}

if(R.collider.tag == "Enemy"){    // Si el raycast esta tocando un collider con el tag Enemy 
GetComponent.<AudioSource>().PlayOneShot(AudioImpacto);  // El audio que se reproduce cuando estamos impactando contra el enemigo
MiraImpacto.enabled = true;  // Mira impacto se activa
Instantiate(Impacto1,R.point,rotation);
}

if(R.collider.tag == "Enemy") {
R.collider.SendMessage("FV", Dano, SendMessageOptions.DontRequireReceiver);
}
}
}

if(Input.GetKeyDown("r") && MunicionTotal >= 1 && Cargador >= 1 && Cargador <= MaximoCargadorMenos1 && BloqueoDelDisparo == true){//LLLLLLLLLLLLLLLLL
Invoke ("Recargar0", DuracionRecarga);
BloqueoDelDisparo = false; // no se puede disparar mientras recargas
GetComponent.<AudioSource>().PlayOneShot(SonidoRecargar);
Invoke("controlreload", DuracionRecarga);
CargarUI.enabled = true;
}

if(Cargador <= 0 && MunicionTotal >= 1 && Cargador <=0 && RecargaAutomatica == true){
Invoke ("Recargar0", DuracionRecarga);
BloqueoDelDisparo = false; // no se puede disparar mientras recargas
GetComponent.<AudioSource>().PlayOneShot(SonidoRecargar);
RecargaAutomatica = false;
Invoke("controlreload", DuracionRecarga);
CargarUI.enabled = true;
}

if(Input.GetButton("Fire2")){
Mira.enabled = false;  // NO TOCAR
} else {
Mira.enabled = true;  // NO TOCAR
}

if(ControlApuntar == false){
Mira.enabled = true;
}

if(MunicionTotal < SistemaCarga){
ControlSistemaCarga = true;
}

if(MunicionTotal > SistemaCarga){
ControlSistemaCarga = false;
}

if(ScriptCM.CM == true && Input.GetKeyDown("z")){
MunicionTotal += MuniSuelo;
}
}

function Recargar0 () {

if(ControlSistemaCarga == false){
Cargador += SistemaCarga;
MunicionTotal -= SistemaCarga;
}

if(SistemaCarga > MunicionTotal && ControlSistemaCarga == false){
Cargador += MunicionTotal;
}

if(ControlSistemaCarga == true){
Cargador += MunicionTotal;
SistemaCarga = MaximoBalasCargador;
SistemaCarga -= Cargador;
Invoke("Recargar2", 0.01);
}

if(ControlSistemaCarga == false){
Invoke("Recargar1", 0.01);
}
}

function Recargar1 () {
SistemaCarga = 0;
BloqueoDelDisparo = true;
RecargaAutomatica = true;
CargarUI.enabled = false;
}

function Recargar2 () {
MunicionTotal = 0;
BloqueoDelDisparo = true;
RecargaAutomatica = true;
CargarUI.enabled = false;
}

function TP () {
ShotPlay = true;
}