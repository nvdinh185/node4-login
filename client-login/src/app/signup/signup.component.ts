import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiStorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formSignUp: FormGroup;
  constructor(
    private fb: FormBuilder
    , private authService: AuthService
    , private apiStorage: ApiStorageService
  ) { }

  ngOnInit() {
    this.formSignUp = this.fb.group({
      email: ['', [Validators.required, gmailValidator]],
      password: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      subject: this.fb.group({
        nodeJS: true,
        angular: false,
        react: false
      })
    })
  }

  async onSubmit() {
    const urlServer = 'http://localhost:3000/auth/create-user';
    const user = this.formSignUp.value;
    const results = await this.authService.postDynamicJson(urlServer, user);
    this.apiStorage.save("TOKEN", results.token);
    console.log(results);
  }

}

const gmailValidator = (formControl: FormControl) => {
  if (formControl.value.includes('@gmail.com')) return null;
  else return { gmail: true };
}