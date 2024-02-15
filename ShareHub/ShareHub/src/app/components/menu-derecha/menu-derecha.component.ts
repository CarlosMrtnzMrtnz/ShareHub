import { CommonModule } from '@angular/common';
import { Component,ElementRef, Renderer2, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-menu-derecha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-derecha.component.html',
  styleUrl: './menu-derecha.component.css'
})
export class MenuDerechaComponent {
    miladitoderecho = signal([
        { ruta1: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg',nombre: "la suc"},
        { ruta1: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg',nombre:"ciona"},
        { ruta1: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg",nombre:"por"},
        { ruta1: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg',nombre:"la noche"},

      ])

}
