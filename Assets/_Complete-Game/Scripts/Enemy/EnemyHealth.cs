using UnityEngine;

namespace CompleteProject
{
    public class EnemyHealth : MonoBehaviour
    {
        public int startingHealth = 100; //Vida inicial           
        public int currentHealth;   //el qeu decrementa                
        public float sinkSpeed = 2.5f; //controla animacion de morir poco a poco caiga al suelo             
        public int scoreValue = 10;                 
        public AudioClip deathClip;   //sonido del enemigo cuando muera              


        Animator anim;                              
        AudioSource enemyAudio;                     
        ParticleSystem hitParticles; //efectos                
        CapsuleCollider capsuleCollider;       //cuando enemigo muere deje de tener presencia en el escenario     
        bool isDead;                                
        bool isSinking;                            

        void Awake ()
        {
            // referencia a componentes
            anim = GetComponent <Animator> ();
            enemyAudio = GetComponent <AudioSource> ();
            hitParticles = GetComponentInChildren <ParticleSystem> ();//referencia hijos del componente
            capsuleCollider = GetComponent <CapsuleCollider> ();

            // salud actual
            currentHealth = startingHealth;
        }


        void Update ()
        {
            
            if(isSinking)
            {
                //velocidad con la que cae al piso el enemigo
                transform.Translate (-Vector3.up * sinkSpeed * Time.deltaTime);
            }
        }


        public void TakeDamage (int amount, Vector3 hitPoint)//daño mas punto donde se dispare
        {
            
            if(isDead)
               
                return;

           
            enemyAudio.Play ();

            
            currentHealth -= amount;//Decrementa vida enemigo en cantidad que se declaro en daño
            
        
            hitParticles.transform.position = hitPoint;

            
            hitParticles.Play();

            
            if(currentHealth <= 0)
            {
                
                Death ();
            }
        }


        void Death ()
        {
            
            isDead = true;

        
            capsuleCollider.isTrigger = true;//se desactiva su apariencia fisica la del enemigo

           
            anim.SetTrigger ("Dead");//se activa triger para que desaparecer el enemigo cambio de estadp

           
            enemyAudio.clip = deathClip;
            enemyAudio.Play ();
        }


        public void StartSinking ()//hacer que el enemigo vaya cayendo al piso por fotograma
        {
           
            GetComponent <UnityEngine.AI.NavMeshAgent> ().enabled = false;//evitar que el enemigo siga el jugador

            
            GetComponent <Rigidbody> ().isKinematic = true;

            isSinking = true;

            //ScoreManager.score += scoreValue;

         
            Destroy (gameObject, 2f);//destruimos el enemigo, y se destruya dentro de 2segundos
        }
    }
}