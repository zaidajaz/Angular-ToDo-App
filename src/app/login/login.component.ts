import { Component, OnInit } from '@angular/core';
import { user } from '../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: user;
  allowLogin: boolean = false;
  loginMessage: string;
  loggedInUser: user = null;
  
  constructor(private router: Router) { 
    this.user = new user();
  }

  ngOnInit() {
    if(localStorage.getItem('user') != null){
      let userString = localStorage.getItem('user');
      this.loggedInUser = <user>JSON.parse(userString);
      this.logIn(this.loggedInUser);
    }
  }

  logIn(user: user){
    this.allowLogin = false;
    let users:user[] = [
      {'username':'zaid','password':'hello','isAdmin':true},
      {'username':'diaz','password':'olleh','isAdmin':false}
    ];

    users.forEach(ruser => {
      if (ruser["username"] == user.username){
        if(ruser["password"] == user.password){
          this.allowLogin = true;
          localStorage.setItem('user',JSON.stringify(ruser));
        }
      }
    });
    if(this.allowLogin){
      this.router.navigateByUrl('/list');
    }
    else{
      this.loginMessage = "Login Failed";
      localStorage.clear();
    }
  }
  formSubmitted(){
    this.logIn(this.user);
  }
}
