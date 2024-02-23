import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { SharehubApiService } from '../../services/sharehub-api.service';

@Component({
    selector: 'app-menu-derecha',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './menu-derecha.component.html',
    styleUrl: './menu-derecha.component.css',
})
export class MenuDerechaComponent {
    miladitoderecho = signal([
        {
            ruta1: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg',
            nombre: 'la suc',
        },
        {
            ruta1: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg',
            nombre: 'ciona',
        },
        {
            ruta1: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg',
            nombre: 'por',
        },
        {
            ruta1: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg',
            nombre: 'la noche',
        },
    ]);
    // ---------------------------------------------------Crear publicacion--------------------------------------------------------------
    // formPublicaciones: FormGroup;
    // private publicacionesServices = inject(SharehubApiService);
    // inputFile!: any;
    // archivo: any;

    // idUsuarioPayload!: string;

    // constructor(private fb: FormBuilder) {
    //     this.formPublicaciones = this.fb.group({
    //         textPublicacion: ['', [Validators.required]],
    //         imgPublicacion: [''],
    //     });
    // }

    // agregarImg(event: any) {
    //     if (event.target.files.length > 0) {
    //         const archivosPublicaciones = event.target.files[0];
    //         this.formPublicaciones
    //             .get('imgPublicacion')!
    //             .setValue(archivosPublicaciones);
    //     }
    // }

    // submitPublicacion() {
    //     if (this.formPublicaciones.valid) {
    //         const formDataPublicaciones = new FormData();
    //         formDataPublicaciones.append(
    //             'textPublicacion',
    //             this.formPublicaciones.get('textPublicacion')!.value
    //         );
    //         formDataPublicaciones.append(
    //             'imgPublicacion',
    //             this.formPublicaciones.get('imgPublicacion')!.value
    //         );
    //         formDataPublicaciones.append('idUsuario', this.idUsuarioPayload);

    //         this.publicacionesServices
    //             .postPublicacion(formDataPublicaciones)
    //             .subscribe((respuestaApi) => {
    //                 Swal.fire({
    //                     title: 'Publicacion creada correctamente!',
    //                     icon: 'success',
    //                 });
    //                 console.log(respuestaApi);
    //                 setTimeout(() => {
    //                     location.reload();
    //                 }, 2000);
    //             });
    //     } else {
    //         Swal.fire({
    //             title: 'Error',
    //             text: 'Ingresa los datos requeridos para crear la publicacion',
    //             icon: 'error',
    //         });
    //     }
    // }

    // payloadInfo() {
    //     console.log('holi');

    //     let tokenSession = sessionStorage.getItem('token');
    //     this.publicacionesServices
    //         .postDesencriptarPayload(tokenSession)
    //         .subscribe((respuestaApi: any) => {
    //             console.log(respuestaApi);
    //             this.idUsuarioPayload = respuestaApi.id;
    //         });
    // }
}
