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
  getCarreras(){
    return this.firestore.collection('carrera').snapshotChanges();
      }
      // tslint:disable-next-line:typedef
      createCarrera(carrera: any){
        return this.firestore.collection('carrera').add(carrera);
      }
      // tslint:disable-next-line:typedef
      updateCarrera(id: any, carrera: any){
        return  this.firestore.collection('carrera').doc(id).update(carrera);
      }
      // tslint:disable-next-line:typedef
      deleteCarrera(id: any){
        return  this.firestore.collection('carrera').doc(id).delete();
      }
  }
