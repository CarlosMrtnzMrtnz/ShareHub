import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from '../app/components/inicio/inicio.component'
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuIzquierdaComponent } from './components/menu-izquierda/menu-izquierda.component';
import { MenuDerechaComponent } from './components/menu-derecha/menu-derecha.component';
import { RegistroComponent } from '../app/components/registro/registro.component'


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        NavbarComponent,
        MenuIzquierdaComponent,
        MenuDerechaComponent,
        RegistroComponent



    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'ShareHub';
}
