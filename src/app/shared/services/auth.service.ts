import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private isAuthentificated = localStorage.getItem('isAuth');

  login(){
    //this.isAuthentificated = true;
      localStorage.setItem('isAuth', 'true');
      this.isAuthentificated = localStorage.getItem('isAuth');
  }

  logout(){
    window.localStorage.clear();
    this.isAuthentificated = '';
  }

  isLoggedIn(){
    return this.isAuthentificated;
  }
}
