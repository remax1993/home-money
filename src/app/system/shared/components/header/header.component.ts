import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {UserModel} from "../../../../shared/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: UserModel;

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogOut(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
