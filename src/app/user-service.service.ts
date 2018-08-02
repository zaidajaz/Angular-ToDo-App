import { Injectable } from '@angular/core';
import { user } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  loggedInUser: user;
  constructor() { }
  
  getLoggedInUser(): user{
      this.loggedInUser = JSON.parse(localStorage.getItem('user'));
      return this.loggedInUser;
  }
}
