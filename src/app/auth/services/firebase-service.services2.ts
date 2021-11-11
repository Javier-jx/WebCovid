import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({

  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  // tslint:disable-next-line:typedef
  getNotificaciones(){
    return this.firestore.collection('notificacion').snapshotChanges();
      }
      // tslint:disable-next-line:typedef
      createNoti(notificacion: any){
        return this.firestore.collection('notificacion').add(notificacion);
      }
      // tslint:disable-next-line:typedef
      updateNoti(id: any, notificacion: any){
        return  this.firestore.collection('notificacion').doc(id).update(notificacion);
      }
      // tslint:disable-next-line:typedef
      deleteNoti(id: any){
        return  this.firestore.collection('notificacion').doc(id).delete();
      }
  }
