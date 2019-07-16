using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;

namespace CompleteProject
{
    public class PlayerHealth : MonoBehaviour
    {
        public int startingHealth = 100;                            
        public int currentHealth; //Decremanta con el daño al jugador
        public Slider healthSlider;//Decrementa energia 
        public Image damageImage;                                   
        public AudioClip deathClip;//Sonido de golpes al personaje
        public float flashSpeed = 5f;                               
        public Color flashColour = new Color(1f, 0f, 0f, 0.1f);  

        Animator anim;                                              
        AudioSource playerAudio;                                    
        PlayerMovement playerMovement;                              
       // PlayerShooting playerShooting;                             
        bool isDead;                                                
        bool damaged;                                               


        void Awake ()//Inicia referencias a componentes 
        {
            // Setting up the references.
            anim = GetComponent <Animator> ();
            playerAudio = GetComponent <AudioSource> ();
            playerMovement = GetComponent <PlayerMovement> ();
            //playerShooting = GetComponentInChildren <PlayerShooting> ();

            //Salud inicial del jugador
            currentHealth = startingHealth;
        }


        void Update ()//Hcer animacion de la imagen que refleja el daño
        {
            // Se verifica si el jugador ya  recibio algun daño
            if(damaged)
            {
               
                damageImage.color = flashColour;//color de imagen de pinta pantalla. color definido
            }
            
            else
            {
                
                damageImage.color = Color.Lerp (damageImage.color, Color.clear, flashSpeed * Time.deltaTime);
            }

            
            damaged = false;
        }


        public void TakeDamage (int amount)//Hacer daño al personaje
        {
            
            damaged = true;

            
            currentHealth -= amount;

            
            healthSlider.value = currentHealth;

            // Se ejecuta efecto de sonido
            playerAudio.Play ();

   
            if(currentHealth <= 0 && !isDead)
            {
             
                Death ();
            }
        }

        void Death ()
        {
            
            isDead = true;

         
            //playerShooting.DisableEffects ();//off

            
            anim.SetTrigger ("Die");

            
            playerAudio.clip = deathClip;
            playerAudio.Play ();

         
            playerMovement.enabled = false;
            //playerShooting.enabled = false;
        }


        public void RestartLevel ()
        {
            
            SceneManager.LoadScene (0);
        }
    }
}