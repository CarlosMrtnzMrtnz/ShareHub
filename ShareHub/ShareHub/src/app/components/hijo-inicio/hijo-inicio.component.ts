import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { Ipublicaciones } from '../../../../models/publicacion';

@Component({
  selector: 'app-hijo-inicio',
  standalone: true,
  imports: [
      CommonModule,
    InicioComponent
  ],
  templateUrl: './hijo-inicio.component.html',
  styleUrl: './hijo-inicio.component.css'
})
export class HijoInicioComponent {

    mostrarInput: boolean = false;

    @Input () rutaImagenUsuario!: string
    @Input () rutaNombre!: string
    @Input () rutaImagen!: string
    @Input () rutaComentario!: string


    toggleInput() {
      this.mostrarInput = !this.mostrarInput;
    }
}
