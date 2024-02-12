import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    constructor(private router: Router){}
    ngOnInit(){
        if(sessionStorage.getItem("login") == '1'){
            this.router.navigate(['/inicio'])
        }
      }
}
