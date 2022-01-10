import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSignIn: FormGroup;
  constructor(
    private fb: FormBuilder
    , private authService: AuthService
  ) { }

  ngOnInit() {
    this.formSignIn = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  async onSubmit() {
    const user = this.formSignIn.value;
    const urlServer = 'http://localhost:3000/auth/login-user';
    try {
      const results = await this.authService.postDynamicJson(urlServer, user, true);
      console.log(results);
    } catch (error) {
      console.log(error);
    }

  }

}
