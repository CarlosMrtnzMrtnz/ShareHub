import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from '../app/components/inicio/inicio.component'
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuIzquierdaComponent } from './components/menu-izquierda/menu-izquierda.component';
import { MenuDerechaComponent } from './components/menu-derecha/menu-derecha.component';
import { LoginComponent } from './components/login/login.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharehubApiService } from '../../src/app/services/sharehub-api.service';


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
        LoginComponent,
        ReactiveFormsModule


    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'ShareHub';
    sesionUsuario: boolean = false

    ngOnInit() {
        if (sessionStorage.getItem("token") != null) {
            this.sesionUsuario = true
        } else {
            this.sesionUsuario = false
        }
        // console.log(this.sesionUsuario);
    }
    // ---------------------------------------------------Crear publicacion--------------------------------------------------------------
    formPublicaciones: FormGroup;
    private publicacionesServices = inject(SharehubApiService);
    inputFile!: any
    archivo: any

    constructor(private fb: FormBuilder) {
        this.formPublicaciones = this.fb.group({
            TextPublicacion: ['', [Validators.required]],
            imgPublicacion: ['',]
        })
    }

    agregarImg(event: any) {
        if (event.target.files.length > 0) {
            const archivosPublicaciones = event.target.files[0]
            this.formPublicaciones.get("imgPublicacion")!.setValue(archivosPublicaciones)
        }
    }

    submitPublicacion() {

        const formDataPublicaciones = new FormData()
        formDataPublicaciones.append('textoPublicacion', this.formPublicaciones.get("textoPublicacion")!.value)
        formDataPublicaciones.append('imgPublicacion', this.formPublicaciones.get("imgPublicacion")!.value)

        this.publicacionesServices.postPublicacion(formDataPublicaciones).subscribe(
            (respuestaApi) => {
                Swal.fire({
                    title: "Publicacion creada correctamente!",
                    icon: "success"
                });
                console.log(respuestaApi)
            }, error => {
                Swal.fire({
                    title: "No se puedo realizar la publicacion",
                    icon: "error"
                });

            }
        )
    }


}
