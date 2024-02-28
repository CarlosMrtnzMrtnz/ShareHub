import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { Ipublicaciones } from '../../../../models/publicacion';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharehubApiService } from '../../services/sharehub-api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-hijo-inicio',
  standalone: true,
  imports: [
    CommonModule,
    InicioComponent,
    ReactiveFormsModule,

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
    @Input () rutaTexto!: string

    usuario!: string
    formPublicaciones: FormGroup;
    inputFile!: any;
    archivo: any;
    _id: string = '';
    comentario: string =''
    idUsuarioPayload!: string;
    publicaciones = signal<any>([])



    constructor(private fb: FormBuilder, private rutaid: ActivatedRoute) {
        this.formPublicaciones = this.fb.group({
            textPublicacion: [' ', [Validators.required]],
            imgPublicacion: [''],
            comentario: ['']
        });

    }



    toggleInput() {
        this.mostrarInput = !this.mostrarInput;
      }

    agregarImg(event: any) {
        if (event.target.files.length > 0) {
            const archivosPublicaciones = event.target.files[0];
            this.formPublicaciones
                .get('imgPublicacion')!
                .setValue(archivosPublicaciones);
        }
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

    payloadInfo() {
        let tokenSession = sessionStorage.getItem('token');
        this.publicacionesServices
            .postDesencriptarPayload(tokenSession)
            .subscribe((respuestaApi: any) => {
                console.log(`id user logueado | payload ${respuestaApi.id}`);
                this.idUsuarioPayload = respuestaApi.id;

            });
    }

// -------------------------------Eliminar publicacion----------------------------
async eliminarPublicacion(idPublicacion: string) {
    let tokenSession = sessionStorage.getItem('token');
    let respuestaApi: any;
    let respuesta: any;

    try {
        respuestaApi = await this.publicacionesServices.postDesencriptarPayload(tokenSession).toPromise();
        this.idUsuarioPayload = respuestaApi.id;
        // console.log(`${this.idUsuarioPayload} respuestaApi.id | idUsuarioPayload logueado`);

        respuesta = await this.publicacionesServices.getUnaPublicacion(idPublicacion).toPromise();
        this.usuario = respuesta.idUsuario;
        // console.log(`${this.usuario} id de usuario que creo la publicacion`);

        if (this.idUsuarioPayload == this.usuario) {
            let mensaje = "Tenga en cuenta que al eliminar esta publicacion no se podrá restablecer";
            // console.log(idPublicacion);

            const result = await Swal.fire({
                title: "¿Estás seguro que quieres eliminar esta publicacion?",
                icon: "question",
                text: mensaje,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "No, cancelar!",
            });

            if (result.isConfirmed) {
                await this.publicacionesServices.deletePublicacion(idPublicacion).toPromise();
                Swal.fire({
                    title: "Publicacion eliminada correctamente!",
                    icon: "success"
                });
                this.consultarPublicaciones();
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        } else {
            Swal.fire({
                title: "Solo puede eliminar quien la creo!",
                icon: "error"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

XXX:boolean = false
// ------------------------------Submit Publicacion------------------------------
    submitPublicacionEditada(idPublicacion: string) {
        console.log(idPublicacion);

        console.log("-----++----",this.formPublicaciones)
        if (this.formPublicaciones.valid) {
            const formDataPublicaciones = new FormData();
            formDataPublicaciones.append('textPublicacion',this.formPublicaciones.get('textPublicacion')!.value);
            formDataPublicaciones.append('imgPublicacion',this.formPublicaciones.get('imgPublicacion')!.value);
            formDataPublicaciones.append('comentario', this.formPublicaciones.get('textPublicacion')!.value);

            const imgPublicacionFile = this.formPublicaciones.get('imgPublicacion')!.value
            console.log("🚀 ~ HijoInicioComponent ~ imgPublicacionFile:", imgPublicacionFile)
            if (imgPublicacionFile != "")  {
                formDataPublicaciones.append('imgPublicacion', imgPublicacionFile)
            }
            console.log('Entro en actualizar');

            this.publicacionesServices
                .putPublicacion(idPublicacion, formDataPublicaciones)
                .subscribe((respuestaApi) => {
                    Swal.fire({
                        title: 'Publicacion editada correctamente!',
                        icon: 'success',
                    });
                    console.log(respuestaApi);
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Ingresa los datos requeridos para editar la publicacion',
                icon: 'error',
            });
        }
    }
// -------------------------------Actualizar publicacion--------------------------
// mostrarModal!: boolean
// async activarModal(idPublicacion: string) {
//     this.mostrarModal = false;
//     let tokenSession = sessionStorage.getItem('token');
//     let respuestaApi: any;
//     let respuesta: any;
//     try {
//         respuestaApi = await this.publicacionesServices.postDesencriptarPayload(tokenSession).toPromise();
//         this.idUsuarioPayload = respuestaApi.id;
//         respuesta = await this.publicacionesServices.getUnaPublicacion(idPublicacion).toPromise();
//         this.usuario = respuesta.idUsuario;

//         // Declara la variable XXX fuera del bloque condicional
//         let XXX: boolean;

//         if (this.idUsuarioPayload == this.usuario) {
//             XXX = true;
//             this.mostrarModal = XXX;
//             // No es necesario declarar nuevamente la variable, solo asigna el valor
//         } else {
//             XXX = false;
//             this.mostrarModal = XXX;
//             // No es necesario declarar nuevamente la variable, solo asigna el valor
//         }

//         console.log(`XXX = ${XXX}`); // Imprime el valor de XXX

//         // Utiliza la variable XXX para controlar la visibilidad del modal
//         // this.mostrarModal = XXX;
//     } catch (error) {
//         console.log(error);
//     }
// }

actualizarPublicacionX(idPublicacion: string) {
    this.publicacionesServices.getUnaPublicacion(idPublicacion).subscribe({
        next: (publicacion) => {
            let dataPublicacion: any = publicacion;
            this.usuario = dataPublicacion._id;
            console.log(`objeto de publicacion ${dataPublicacion._id}`);
                console.log(`idUsuario creo publicacion ${dataPublicacion.idUsuario}`);

                if(dataPublicacion.imagenPublicacion == null) {
                    dataPublicacion.imagenPublicacion = ''
                }
                if(dataPublicacion.comentario == null || dataPublicacion.comentario == undefined){
                    dataPublicacion.comentario = ''
                }

                this.formPublicaciones.setValue({
                    textPublicacion: '',
                    imgPublicacion: '',
                    comentario: ''
                })

            },
            error: (err) => {
                console.log(err);
            },
        })
    }

}
