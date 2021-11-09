import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor( private authSvc: AuthService, private  router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  async onRegister(){
    const {email, password } = this.registerForm.value;
    try{
      const user = await this.authSvc.register(email, password);
      if (user){
        this.router.navigate(['/home']);
      }
    }catch (error){console.log(error); }

  }

}
