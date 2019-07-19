using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float speed = 6f;//Velocidad de movimiento

    Vector3 movement; //Hacia donde se quiere avanzar las taclas que se usan
    Animator anim;//Referencia hacia los componentes
    Rigidbody playerRigidbody;
    int floorMask;
    float camRayLength = 100f;//La longitug de lo que lanza la arma
    

    void Awake()//obtener las referencias de los objetos componentes
    {
        anim = GetComponent<Animator>();
        playerRigidbody = GetComponent<Rigidbody>();
        floorMask = LayerMask.GetMask("Floor");

    }

    void FixedUpdate()//Se ejecuta para ciclo del motor de fisica
    {
        float h = Input.GetAxisRaw("Horizontal");//Se pulza tecla izq o der
        float v = Input.GetAxisRaw("Vertical");//Se pulza tecla arr o abaj
        Move(h , v);
        Turning();
        animating(h , v);

    }
    void Move(float h , float v)//Metodo para conocer el movimiento en h y v
    {
        movement.Set(h, 0f, v);
        movement = (movement.normalized * speed * Time.deltaTime);//Se normaliza el vector
        playerRigidbody.MovePosition(transform.position + movement);//Ya podemos mover el personaje
        
    }
    void Turning()
    {
        Ray camRay = Camera.main.ScreenPointToRay(Input.mousePosition);//Se define el giro del personaje atacar
        RaycastHit floorHit;
        if (Physics.Raycast(camRay, out floorHit, camRayLength, floorMask))
        {
            Vector3 playerToMouse = floorHit.point - transform.position;//Vector desde la pos del pers hasta donde se toco con el mouse
            playerToMouse.y = 0f; //Evitamos que el personaje no mire hacia abajo ya que no es necesario
            Quaternion newRotation = Quaternion.LookRotation(playerToMouse);//Esto se genera proque unity no entiende sobre vectores
            //haciendo rotaciones concretas evitando movimientos no deseados
            playerRigidbody.MoveRotation(newRotation);
        }
    }

   
    void animating (float h, float v)
    {
        bool idle = ((v == 0) && (h == 0));
        anim.SetBool("IsWalking", !idle);
    }


    
}
