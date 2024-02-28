import { Component, SimpleChanges, inject, signal } from '@angular/core';
import { SharehubApiService } from '../../services/sharehub-api.service';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersInterface } from '../../interface/users-interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-perfil',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.css',
})
export class PerfilComponent {
    formPerfil: FormGroup;
    private PerfilServices = inject(SharehubApiService);
    listadoDeUsuarios = signal<any>([]);
    idPerfilUrl: string | null;

    nombre: string = '';
    CorreoUser: string = '';
    clave: string = '';
    imguser: string = '';
    descripcionuser: string = '';
    _id: string = "";
    idPersonaSesion: string = ""
    verificarIDUsuario: boolean = false
    idURL: any

    inputHiddenID = new FormControl();

    constructor(private fb: FormBuilder, private rutaId: ActivatedRoute) {
        this.formPerfil = this.fb.group({
            nombre: ['', [Validators.required]],
            descripcionuser: [''],
            imguser: [''],
            idHidden: [''],
        });

        this.idPerfilUrl = this.rutaId.snapshot.paramMap.get('idPerfil');
    }

    agregarImagenArr(event: any) {
        if (event.target.files.length > 0) {
            const archivoUser = event.target.files[0];
            this.formPerfil.get('imguser')!.setValue(archivoUser);
        }
    }

    ngOnInit(): void {
        this.rutaId.paramMap.subscribe(params => {
            this.idURL = params.get('id');
            this.PerfilServices.getUsuario(this.idPerfilUrl).subscribe({
                next: (perfil: any) => {
                    let perfilData: UsersInterface = perfil;
                    this.nombre = perfilData.nombre;
                    this.CorreoUser = perfilData.CorreoUser;
                    this.clave = perfilData.clave;
                    this.imguser = perfilData.imguser;
                    this.descripcionuser = perfilData.descripcionuser;
                    this._id = perfilData._id;
                    this.tokenUsuario()

                },
                error: (err) => {
                    console.log(err);
                },
            });
        });
    }


    submitFormEditar() {
        if (this.formPerfil.valid) {

            const formData: any = new FormData();
            formData.append('nombre', this.formPerfil.get('nombre')!.value);
            formData.append('descripcionuser', this.formPerfil.get('descripcionuser')!.value);
            formData.append('idHidden', this.formPerfil.get('idHidden')!.value);

            const imguserFile = this.formPerfil.get('imguser')!.value;
            if (imguserFile != "") {
                formData.append('imguser', imguserFile);
            } else {
                formData.append('imguser', "");
            }


            console.log(formData);
            this.PerfilServices.putUsuario(this.formPerfil.value.idHidden, formData).subscribe((respuestaAPI) => {
                Swal.fire({
                    title: 'Perfil actualizado correctamente!',
                    icon: 'success',
                });
                setTimeout(() => {
                    location.reload()
                }, 1000);
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingresa los datos requeridos para actualizar el perfil',
                icon: 'error',
            });
        }
    }

    actualizarPerfil(usuarioId: string) {
        this.PerfilServices.getUsuario(usuarioId).subscribe({
            next: (perfil) => {
                let dataUsuario: any = perfil;

                this._id = dataUsuario._id;

                if (dataUsuario.descripcionuser == null) {
                    dataUsuario.descripcionuser = '';
                }
                if (dataUsuario.imguser == null) {
                    dataUsuario.imguser = '';
                }

                this.formPerfil.setValue({
                    nombre: dataUsuario.nombre,
                    // CorreoUser: dataUsuario.CorreoUser,
                    // clave: dataUsuario.clave,
                    imguser: '',
                    descripcionuser: dataUsuario.descripcionuser,
                    idHidden: dataUsuario._id,
                });
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    tokenUsuario() {
        let tokenSession = sessionStorage.getItem('token');
        this.PerfilServices
            .postDesencriptarPayload(tokenSession)
            .subscribe((respuestaApi: any) => {
                this.idPersonaSesion = respuestaApi.id;
                this.verificarIDUsuario = (this.idPersonaSesion == this._id) ? true : false
            });
    }


}
