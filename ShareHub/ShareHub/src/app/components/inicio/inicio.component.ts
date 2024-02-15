import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HijoInicioComponent } from '../hijo-inicio/hijo-inicio.component';
import { Ipublicaciones } from '../../../../models/publicacion';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    HijoInicioComponent
],
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

// --------------prueba de comentarios-----------------
publicaciones = signal<Ipublicaciones[]>([
    {
    nombre: "Carlos Martinez",
    imagenUsuario:"https://cdn0.psicologia-online.com/es/posts/8/5/1/como_desenamorarse_de_alguien_rapido_5158_600.jpg" ,
    imagenPublicacion: "https://laopinion.com/wp-content/uploads/sites/3/2022/03/nostalgia.jpg?resize=360,202&quality=80",
    textoPublicacion: "publicacion de prueba 1"
    },
    {
    nombre: "Layhan Perez",
    imagenUsuario:"https://cdn0.psicologia-online.com/es/posts/8/5/1/como_desenamorarse_de_alguien_rapido_5158_600.jpg" ,
    imagenPublicacion: "https://laopinion.com/wp-content/uploads/sites/3/2022/03/nostalgia.jpg?resize=360,202&quality=80",
    textoPublicacion: "publicacion de prueba 2"
    },
    {
    nombre: "Seferino cañate",
    imagenUsuario:"https://cdn0.psicologia-online.com/es/posts/8/5/1/como_desenamorarse_de_alguien_rapido_5158_600.jpg" ,
    imagenPublicacion: "",
    textoPublicacion: "publicacion de prueba 3"
    },

])

}
