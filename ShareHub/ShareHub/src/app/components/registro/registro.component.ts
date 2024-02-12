import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
    constructor(private router: Router){}
    ngOnInit(){
        if(sessionStorage.getItem("login") == '1'){
            this.router.navigate(['/inicio'])
        }
      }
}
