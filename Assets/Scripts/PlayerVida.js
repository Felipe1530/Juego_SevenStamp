#pragma strict

var vida : float;// poner vida del player

var ScriptD : PCamDisparos;// poner script PCamDisparos
var playermove : PlayerMove;// poner script PlayerMove
var playeranim : PlayerAnim;// poner script PlayerAnim

var TextVida : UI.Text;// texto para saber nuestra vida

function Start () {

}

function Update () {

TextVida.text = vida.ToString("0");//TextVida = vida

if(vida <= 0){

vida = 0;

playermove.enabled = false;
ScriptD.enabled = false;

Invoke("GameOver", 5);

playeranim.AnimatorPlayer.SetBool("muerte", true);
playeranim.AnimatorPlayer.SetBool("correr", false);
playeranim.AnimatorPlayer.SetBool("apuntar", false);
playeranim.AnimatorPlayer.SetBool("apuntarcaminarws", false);
playeranim.AnimatorPlayer.SetBool("apuntarcaminarad", false);
playeranim.AnimatorPlayer.SetBool("apuntarcaminarsdaw", false);
playeranim.AnimatorPlayer.SetBool("apuntarcaminarsadw", false);
}
}

function OnTriggerStay (other : Collider){

if(other.tag == "Enemy"){
vida -= 5 * Time.deltaTime; 
}
}

function GameOver () {
Application.LoadLevel("menu");
//SceneManager.LoadScene("menu");
}