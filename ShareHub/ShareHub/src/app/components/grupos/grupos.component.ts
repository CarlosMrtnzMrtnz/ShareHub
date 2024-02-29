import { Component, inject, signal } from '@angular/core';
import { SharehubApiService } from '../../services/sharehub-api.service';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GruposInterface } from '../../interface/grupos-interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-grupos',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './grupos.component.html',
    styleUrl: './grupos.component.css',
})
export class GruposComponent {
    formGrupos: FormGroup;
    private GruposServices = inject(SharehubApiService);
    listadoDeGrupos = signal<any>([]);
    listaUsuarios: any = [];
    listaMiembros: any = [];
    idGrupoUrl: null | string;

    nombreGrupo: string = '';
    descripcionGrupo: string = '';
    imgGrupo: string = '';
    _id: string = '';

    inputHiddenID = new FormControl();

    constructor(private fb: FormBuilder, private rutaId: ActivatedRoute, private router: Router) {
        this.formGrupos = this.fb.group({
            nombreGrupo: ['', [Validators.required]],
            descripcionGrupo: [''],
            imgGrupo: [''],
            idHidden: [''],
        });

        this.idGrupoUrl = this.rutaId.snapshot.paramMap.get('idGrupo');
    }

    agregarImagenArr(event: any) {
        if (event.target.files.length > 0) {
            const archivoGrupo = event.target.files[0];
            this.formGrupos.get('imgGrupo')!.setValue(archivoGrupo);
        }
    }

    ngOnInit(): void {
        if (sessionStorage.getItem('token') == null) {
            this.router.navigate(['/']);
        }
        this.GruposServices.getUnGrupo(this.idGrupoUrl).subscribe({
            next: (grupos: any) => {
                let gruposData: GruposInterface = grupos;
                this.nombreGrupo = gruposData.nombreGrupo;
                this.descripcionGrupo = gruposData.descripcionGrupo;
                this.imgGrupo = gruposData.imgGrupo;
                this._id = gruposData._id;
            },
            error: (err) => {
                console.log(err);
            },
        });

        console.log('Se inicio el componente');
    }

    submitFormEditar() {
        if (this.formGrupos.valid) {
            const formData: any = new FormData();
            formData.append(
                'nombreGrupo',
                this.formGrupos.get('nombreGrupo')!.value
            );
            formData.append(
                'descripcionGrupo',
                this.formGrupos.get('descripcionGrupo')!.value
            );
            formData.append('idHidden', this.formGrupos.get('idHidden')!.value);

            const imgGrupoFile = this.formGrupos.get('imgGrupo')!.value;
            if (imgGrupoFile != '') {
                formData.append('imgGrupo', imgGrupoFile);
            } else {
                formData.append('imgGrupo', '');
            }

            console.log('Entro en actualizar');
            this.GruposServices.putGrupo(
                this.formGrupos.value.idHidden,
                formData
            ).subscribe((respuestaAPI) => {
                Swal.fire({
                    title: 'Grupo actualizado correctamente!',
                    icon: 'success',
                });
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingresa los datos requeridos para actualizar el grupo',
                icon: 'error',
            });
        }
    }

    actualizarGrupo(grupoId: string) {
        this.GruposServices.getUnGrupo(grupoId).subscribe({
            next: (grupo) => {
                let dataGrupo: any = grupo;

                this._id = dataGrupo._id;

                if (dataGrupo.descripcionGrupo == null) {
                    dataGrupo.descripcionGrupo = '';
                }
                if (dataGrupo.imgGrupo == null) {
                    dataGrupo.imgGrupo = '';
                }

                this.formGrupos.setValue({
                    nombreGrupo: dataGrupo.nombreGrupo,
                    descripcionGrupo: dataGrupo.descripcionGrupo,
                    imgGrupo: '',
                    idHidden: dataGrupo._id,
                });
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

// -------------------------------------- Agregar miembros -------------------------------------------
    obtenerUsuarios() {
        this.GruposServices.getUsuarios().subscribe({
            next: (usuarios: any) => {
                console.log(usuarios);
                this.listaUsuarios = usuarios;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    agregarMiembro(idUsuario: string) {
        this.GruposServices.getUnGrupo(this.idGrupoUrl).subscribe({
            next: (grupo: any) => {
                let dataConsultaGrupo = grupo;
                const formData: any = new FormData();
                formData.append('imgGrupo', '');
                formData.append('nombreGrupo', dataConsultaGrupo.nombreGrupo);
                formData.append(
                    'descripcionGrupo',
                    dataConsultaGrupo.descripcionGrupo
                );
                dataConsultaGrupo.miembros.push(idUsuario);
                formData.append('miembros', dataConsultaGrupo.miembros);
                this.GruposServices.putGrupo(
                    this.idGrupoUrl,
                    formData
                ).subscribe({
                    next: () => {
                        this.obtenerMiembrosEliminar();
                        alert('miembro agregado');
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

// ----------------------------------- Eliminar miembros ---------------------------------
    obtenerMiembrosEliminar() {
        this.GruposServices.getUnGrupo(this.idGrupoUrl).subscribe({
            next: (grupo: any) => {
                let dataConsultaGrupo = grupo;
                this.listaMiembros = dataConsultaGrupo.miembros;
                console.log(
                    '🚀 ~ GruposComponent ~ this.GruposServices.getUnGrupo ~ this.listaMiembros:',
                    this.listaMiembros
                );
                this.listaMiembros.forEach(
                    (idUsuario: string, index: number) => {
                        this.GruposServices.getUsuario(idUsuario).subscribe({
                            next: (usuarioInfo: any) => {
                                this.listaMiembros[index] = {
                                    ...this.listaMiembros[index],
                                    nombre: usuarioInfo.nombre,
                                    imguser: usuarioInfo.imguser,
                                };
                                console.log('Lista de miembros actualizada:',this.listaMiembros);
                            },
                            error: (err) => {
                                console.log(err);
                            },
                        });
                    }
                );
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    eliminarMiembro(idUsuario: string) {
        // Obtener el índice del miembro en la lista
        const index = this.listaMiembros.findIndex((miembro: any) => miembro._id === idUsuario);
        console.log(idUsuario);


        this.GruposServices.getUnGrupo(this.idGrupoUrl).subscribe({
            next: (grupo: any) => {
                let dataConsultaGrupo = grupo;
                const formData: any = new FormData();
                formData.append('imgGrupo', '');
                formData.append('nombreGrupo', dataConsultaGrupo.nombreGrupo);
                formData.append('descripcionGrupo',dataConsultaGrupo.descripcionGrupo);
                if (index !== -1) {
                    // eliminar el miembro del array
                    this.listaMiembros.splice(index, 1);
                    console.log(this.listaMiembros);


                    // llamar a service para eliminar el miembro de la base de datos
                    this.GruposServices.eliminarMiembroDeDB(idUsuario).subscribe({
                        next: (respuesta) => {
                            console.log(idUsuario);
                            console.log(
                                'Miembro eliminado de la base de datos:',
                                respuesta
                            );

                            // luego de eliminar actualizar la lista en el componente
                            this.obtenerMiembrosEliminar();
                            alert('Miembro eliminado correctamente');
                        },
                        error: (err) => {
                            console.log(err);
                        },
                    });
                } else {
                    console.log('No se encontró el miembro en la lista');
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
