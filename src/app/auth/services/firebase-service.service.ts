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
  getClientes(){
    return this.firestore.collection('clientes').snapshotChanges();
      }
      // tslint:disable-next-line:typedef
      createCliente(cliente: any){
        return this.firestore.collection('clientes').add(cliente);
      }
      // tslint:disable-next-line:typedef
      updateCliente(id: any, cliente: any){
        return  this.firestore.collection('clientes').doc(id).update(cliente);
      }
      // tslint:disable-next-line:typedef
      deleteCliente(id: any){
        return  this.firestore.collection('clientes').doc(id).delete();
      }

  }

