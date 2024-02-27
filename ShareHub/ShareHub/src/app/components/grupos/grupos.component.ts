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
import { ActivatedRoute } from '@angular/router';
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
    listaUsuarios:any= [];
    idGrupoUrl: null | string;

    nombreGrupo: string = '';
    descripcionGrupo: string = '';
    imgGrupo: string = '';
    _id: string = '';

    inputHiddenID = new FormControl();

    constructor(private fb: FormBuilder, private rutaId: ActivatedRoute) {
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
            const formData:any = new FormData();
            formData.append('nombreGrupo', this.formGrupos.get('nombreGrupo')!.value);
            formData.append('descripcionGrupo', this.formGrupos.get('descripcionGrupo')!.value);
            formData.append('idHidden', this.formGrupos.get('idHidden')!.value);

            const imgGrupoFile = this.formGrupos.get('imgGrupo')!.value;
            if (imgGrupoFile != "") {
                formData.append('imgGrupo', imgGrupoFile);
            }else{
                formData.append('imgGrupo', "");
            }


            console.log('Entro en actualizar');
            this.GruposServices.putGrupo(this.formGrupos.value.idHidden, formData).subscribe((respuestaAPI) => {
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

    // Agregar miembros ---------------------------
    obtenerUsuarios(){
        this.GruposServices.getUsuarios().subscribe({
            next: (usuarios : any) =>{
                console.log(usuarios);
                this.listaUsuarios = usuarios;
            },
            error: (err) =>{
                console.log(err)
            }
        })
    }

    agregarMiembro(){
        // this.GruposServices.postMiembroGrupo(this.idGrupoUrl, this.inputHiddenID.value).subscribe({
        //     next: (respuestaAPI) => {
        //         Swal.fire({
        //             title: 'Miembro agregado correctamente!',
        //             icon:'success',
        //         });
        //         this.obtenerUsuarios();
        //     },
        //     error: (err) => {
        //         console.log(err);
        //     },
        // });
    }

    obtenerMiembrosEliminar(){

    }
}
