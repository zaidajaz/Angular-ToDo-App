import { Injectable } from '@angular/core';
import { user } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  getLoggedInUser(): user{
      let loggedInUser: user = JSON.parse(localStorage.getItem('user'));
      return loggedInUser;
  }
}
