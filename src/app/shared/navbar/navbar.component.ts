import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService],
})
export class NavbarComponent {
public isLogged = false;
public user$: Observable <any> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService, private  router: Router) { }

// tslint:disable-next-line:typedef
async onLogout(){
  try{
    await this.authSvc.logout();
    this.router.navigate(['/login']);
  }
  catch (error){console.log(error); }

}
}
