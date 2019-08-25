import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {UsersService} from "../../shared/services/users.service";
import {UserModel} from "../../shared/models/user.model";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
      private usersService: UsersService,
      private router: Router,
      private title: Title

  ) {
      title.setTitle('Регистрация');
  }

  ngOnInit() {
      this.form = new FormGroup({
          email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
          password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
          name: new FormControl(null, [Validators.required]),
          agree: new FormControl(false, [Validators.required, Validators.requiredTrue])
      })
  }

  onSubmit(){
    const {email, password, name} = this.form.value;
    const user = new UserModel(email, password, name);

    this.usersService.createNewUser(user).subscribe((user: UserModel) => {
      this.router.navigate(['/login'], {
        queryParams:{
          nowCanLogin: true
        }
      })
    })
  }

  forbiddenEmails(control: FormControl): Promise<any>{
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
          .subscribe((user: UserModel) => {
            if(user){
              resolve({forbiddenEmail: true})
            }else{
              resolve(null)
            }
          })
    })
  }

}
