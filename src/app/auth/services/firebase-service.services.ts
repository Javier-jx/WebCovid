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
  getSintomas(){
    return this.firestore.collection('sintoma').snapshotChanges();
      }
      // tslint:disable-next-line:typedef
      createSintoma(sintoma: any){
        return this.firestore.collection('sintoma').add(sintoma);
      }
      // tslint:disable-next-line:typedef
      updateSintoma(id: any, sintoma: any){
        return  this.firestore.collection('sintoma').doc(id).update(sintoma);
      }
      // tslint:disable-next-line:typedef
      deleteSintoma(id: any){
        return  this.firestore.collection('sintoma').doc(id).delete();
      }
  }

