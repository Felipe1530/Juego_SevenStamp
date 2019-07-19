using UnityEngine;

public class PlayerShooting : MonoBehaviour
{
    public int damagePerShot = 20;
    public float timeBetweenBullets = 0.15f;//tiempo entre los disparos
    public float range = 100f;//La distacia que alcanza 


    float timer;
    Ray shootRay = new Ray();
    RaycastHit shootHit;//Resulktado del objeto colisionado
    int shootableMask;//Las capas que colisiona
    ParticleSystem gunParticles;
    LineRenderer gunLine;
    AudioSource gunAudio;
    Light gunLight;
    float effectsDisplayTime = 0.2f;//tiempo que se visualiza 


    void Awake ()
    {
        shootableMask = LayerMask.GetMask ("Shootable");//referencia a la capa
        gunParticles = GetComponent<ParticleSystem> ();
        gunLine = GetComponent <LineRenderer> ();
        gunAudio = GetComponent<AudioSource> ();
        gunLight = GetComponent<Light> ();
    }


    void Update ()
    {
        timer += Time.deltaTime;//tiempo desde la ultima vez que se disparo

		if(Input.GetButton ("Fire1") && timer >= timeBetweenBullets && Time.timeScale != 0)//verificar que no este pausado
        {
            Shoot ();//hay que disparar?
        }

        if(timer >= timeBetweenBullets * effectsDisplayTime)//cuando se activa disparar click izq
        {
            DisableEffects ();
        }
    }


    public void DisableEffects ()
    {
        gunLine.enabled = false;
        gunLight.enabled = false;
    }


    void Shoot ()
    {
        timer = 0f;

        gunAudio.Play ();

        gunLight.enabled = true;

        gunParticles.Stop ();
        gunParticles.Play ();

        gunLine.enabled = true;
        gunLine.SetPosition (0, transform.position);

        shootRay.origin = transform.position;//posicion desde donde sale la bala
        shootRay.direction = transform.forward;//la direccion donde sale la bala

        if(Physics.Raycast (shootRay, out shootHit, range, shootableMask))//se comprueba si se colisiona
        {
            EnemyHealth enemyHealth = shootHit.collider.GetComponent <EnemyHealth> ();//acceder al collider que se colisiono
            if(enemyHealth != null)
            {
                enemyHealth.TakeDamage (damagePerShot, shootHit.point);//vectos3 para ver donde se colisiono
            }
            gunLine.SetPosition (1, shootHit.point);
        }
        else
        {
            gunLine.SetPosition (1, shootRay.origin + shootRay.direction * range);//disparo de posicion por unidades
        }
    }
}
