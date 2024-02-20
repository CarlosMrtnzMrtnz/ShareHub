import { CommonModule } from '@angular/common';
import { Component,ElementRef, Renderer2, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharehubApiService } from '../../services/sharehub-api.service';

@Component({
  selector: 'app-menu-derecha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
],
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
// ---------------------------------------------------Crear publicacion--------------------------------------------------------------
    formPublicaciones: FormGroup;
    private publicacionesServices = inject(SharehubApiService)

    constructor(private fb: FormBuilder) {
        this.formPublicaciones = this.fb.group({
            TextPublicacion: ['', [Validators.required]],
            imgPublicacion: ['',]
              })
    }

    submitPublicacion() {
        this.publicacionesServices.postPublicacion(this.formPublicaciones.value).subscribe(respuestaApi => {
            Swal.fire({
                title: "Publicacion creada correctamente!",
                icon: "success"
            });
            console.log(respuestaApi)
        })
    }





}
