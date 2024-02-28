import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { Ipublicaciones } from '../../../../models/publicacion';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharehubApiService } from '../../services/sharehub-api.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hijo-inicio',
  standalone: true,
  imports: [
    CommonModule,
    InicioComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './hijo-inicio.component.html',
  styleUrl: './hijo-inicio.component.css'
})
export class HijoInicioComponent {
    private publicacionesServices = inject(SharehubApiService)

    mostrarInput: boolean = false;

    @Input () rutaImagenUsuario!: string
    @Input () rutaNombre!: string
    @Input () rutaImagen!: string
    @Input () rutaComentario!: string
    @Input () rutaId!: string
    @Input () idUsuario!: string


    toggleInput() {
      this.mostrarInput = !this.mostrarInput;
    }

    publicaciones = signal<any>([])
// -------------------------------Eliminar publicacion----------------------------
    eliminarPublicacion(idPublicacion: string) {
            let mensaje = ""
            if (idPublicacion == undefined || idPublicacion == null) {
                mensaje = `Tenga en cuenta que al eliminar esta publicacion no se podrá restablecer`
            } else {
                mensaje = `Tenga en cuenta que al eliminar esta publicacion no se podrá restablecer`
            }
            Swal.fire({
                title: "¿Estás seguro que quieres eliminar este producto?",
                icon: "question",
                text: mensaje,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "No, cancelar!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.publicacionesServices.deletePublicacion(idPublicacion).subscribe({
                        next: (publicacion2) => {
                            Swal.fire({
                                title: "Publicacion eliminada correctamente!",
                                icon: "success"
                            });this.consultarPublicaciones()
                            setTimeout(() => {
                                location.reload()
                            }, 2000);
                        },
                        error: (err) => {
                            console.log(err);
                        }
                    })
                }
            })
            this.consultarPublicaciones()

    }

    consultarPublicaciones() {
        this.publicacionesServices.getPublicaciones().subscribe({
            next: (publicaciones2) => {
                this.publicaciones.set(publicaciones2)
                console.log(this.publicaciones());

            }, error: (err) => {
                console.log(err);
            }
        })
    }
}
