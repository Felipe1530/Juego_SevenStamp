using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TextoFlotente : MonoBehaviour
{
    public float TiempoDeVida = 1000;
    public GameObject TextoFlotantePrefab;
    // Start is called before the first frame update
    void Start()
    {
        if(TextoFlotantePrefab)
        {
            MostrarTextoFlotante();
        }
        
    }

    // Update is called once per frame
    void Update()
    {
        TiempoDeVida -= Time.deltaTime;
        if(TiempoDeVida <= 0)
        {
            Destroy(this.gameObject);
        }
        
    }

     public void MostrarTextoFlotante()
    {
        GameObject texto = Instantiate(TextoFlotantePrefab);
        texto.transform.position = new Vector3(this.gameObject.transform.position.x,
            this.gameObject.transform.position.y+4,
            this.gameObject.transform.position.z);
    }
}
