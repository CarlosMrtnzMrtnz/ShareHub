import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
    constructor(private router: Router){}
    ngOnInit(){
        if(sessionStorage.getItem("login") == null){
            this.router.navigate(['/'])
        }
      }
}
