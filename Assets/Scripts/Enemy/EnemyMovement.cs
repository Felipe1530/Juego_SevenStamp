using UnityEngine;
using System.Collections;

public class EnemyMovement : MonoBehaviour
{
    Transform player; //Se obtiene la referencia del jugador para saber donde esta en cada momento 
    PlayerHealth playerHealth;
    EnemyHealth enemyHealth;
    UnityEngine.AI.NavMeshAgent nav;//El componente de  IA para recorrer 
    


    void Awake ()
    {
        player = GameObject.FindGameObjectWithTag ("Player").transform;//Refencia de encontrar el objeto player
        playerHealth = player.GetComponent <PlayerHealth> ();
        enemyHealth = GetComponent <EnemyHealth> ();
        nav = GetComponent <UnityEngine.AI.NavMeshAgent> ();//se obtiene el nav
    }


    void Update ()
    {
        if ( enemyHealth.currentHealth > 0 && playerHealth.currentHealth > 0)//cuando alguno muere no siga mas
        {
            nav.SetDestination (player.position);// donde esta player para que vaya a él 
        }
        else
        {
          nav.enabled = false;
        }
    }
}
