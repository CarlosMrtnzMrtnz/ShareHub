import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MenuIzquierdaComponent } from './component/menu-izquierda/menu-izquierda.component';
import { MenuDerechaComponent } from './component/menu-derecha/menu-derecha.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    MenuIzquierdaComponent,
    MenuDerechaComponent,


],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShareHub';
  sesionUsuario: boolean = false

  ngOnInit(){
    if(sessionStorage.getItem("login") == '1'){
        this.sesionUsuario = true
    }else{
        this.sesionUsuario = false
    }
  }
}
