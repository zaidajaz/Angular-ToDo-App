import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser: user;
  constructor(private router: Router) { }

  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    if(this.loggedInUser == null)
      this.router.navigateByUrl('/login');  
  }

  logoutUser(){
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
