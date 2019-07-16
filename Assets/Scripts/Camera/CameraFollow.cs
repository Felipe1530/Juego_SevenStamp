using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFollow : MonoBehaviour
{
   public Transform target;
   public float smoothing = 5f;
   Vector3 offset;

   void Start()

       {
           offset = transform.position - target.position;// quitamos la posision de objeto a seguir
       }

       void FixedUpdate()//Generamos que la camara se mueva
       {
           Vector3 targetCamPos = target.position + offset;//posicion de destino donde va estar la camara
           transform.position = Vector3.Lerp(transform.position, targetCamPos, smoothing * Time.deltaTime);
       }



   
       
   
}
