import { Component } from '@angular/core';
import { ApiStorageService } from './services/api-storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService
    , private apiStorage: ApiStorageService
  ) { }

  async ngOnInit() {
    let token = this.apiStorage.read("TOKEN");
    if (token) {
      try {
        let user = await this.authService.postDynamicJson('http://localhost:3000/auth/authorize-token', { token })
        console.log(user);
        this.authService.token = user.token;
      } catch (e) {
        console.error('Lỗi: ', e);
      }
    } else {
      console.error('token: ', token);
    }
  }
}
