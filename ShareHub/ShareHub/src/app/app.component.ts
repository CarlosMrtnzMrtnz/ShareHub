import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuIzquierdaComponent } from './components/menu-izquierda/menu-izquierda.component';
import { MenuDerechaComponent } from './components/menu-derecha/menu-derecha.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    MenuIzquierdaComponent,
    InicioComponent,
    MenuDerechaComponent,
    LoginComponent


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
    console.log(this.sesionUsuario);
  }

}
