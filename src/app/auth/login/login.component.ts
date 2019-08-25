import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";

import {UsersService} from "../../shared/services/users.service";
import {UserModel} from "../../shared/models/user.model";
import {MessageModel} from "../../shared/models/message.model";
import {AuthService} from "../../shared/services/auth.service";
import {fadeStateTrigger} from "../../shared/animations/fade.animation";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: MessageModel;

  constructor(
      private usersService: UsersService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private title: Title,
      private meta: Meta
  ) {
    title.setTitle('Вход в систему');
    meta.addTags([
        {name: 'keywords', content: 'логин,вход,система'},
        {name: 'description', content: 'Страница для входа в систему'}
    ])
  }

  ngOnInit() {
    this.message = new MessageModel('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [
          Validators.required,
          Validators.email
      ]),
      'password': new FormControl(null, [
          Validators.required,
          Validators.minLength(6)
      ])
    });

    this.route.queryParams.subscribe((params: Params)=>{
      if(params['nowCanLogin']){
        this.showMessage('Теперь вы можете зайти в систему', 'success')
      }else if(params['accessDenied']){
          this.showMessage('Для работы с системой вам необходимо войти', 'warning')
      }
    })
  }


  onSubmit(){
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
        .subscribe((user: UserModel) => {
          if(user){
            if(user.password === formData.password){
              this.message.text = '';
              window.localStorage.setItem('user', JSON.stringify(user));
              this.authService.login();
              this.router.navigate(['/system', 'bill'])
            }else{
              this.showMessage('Пароль неверный')
            }
          }else{
            this.showMessage('user not found')
          }
        })
  }

  private showMessage(text: string, type: string = 'danger'){
    this.message = new MessageModel(type, text);

    setTimeout(_ => {
      this.message.text = ''
    }, 5000)
  }

}
