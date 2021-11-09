import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';





@Injectable()

export class AuthService {

  constructor( public afAuth: AngularFireAuth) { }

// tslint:disable-next-line:typedef
async login(email: string, password: string ){
  try{
    const  result = await this.afAuth.signInWithEmailAndPassword(email, password);
    return result;
  }catch (error){
    console.log(error);
  }

}

// tslint:disable-next-line:typedef
async register(email: string, password: string ){
  try{
    const  result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return result;
  }catch (error){
    console.log(error);
  }

}

  // tslint:disable-next-line:typedef
  async logout(){
    try{
      await this.afAuth.signOut();
    } catch (error){
      console.log(error);
  }
}


}
