import { Component, OnInit } from '@angular/core';
import { user } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: user;
  allowLogin: boolean = false;
  loginMessage: string;
  constructor() { 
    this.user = new user();
  }

  ngOnInit() {
  }

  formSubmitted(){
    let users = [
      {'username':'zaid','password':'hello','userType':'admin'},
      {'username':'diaz','password':'olleh','userType':'nadmin'}
    ];

    users.forEach(user => {
      if (user["username"] == this.user.username){
        if(user["password"] == this.user.password){
          this.allowLogin = true;
        }
      }
    });
    if(this.allowLogin){
      this.loginMessage = "Login Successful";
    }
    else{
      this.loginMessage = "Login Failed";
    }
  }
}
