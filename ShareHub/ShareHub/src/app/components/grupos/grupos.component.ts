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
    // private GruposServices = inject(SharehubApiService);
    listadoDeGrupos = signal<any>([]);
    idGrupoUrl: null | string;

    nombreGrupo: string = '';
    descripcionGrupo: string = '';
    imgGrupo: string = '';
    _id: string = '';

    inputHiddenID = new FormControl()

    constructor(private fb: FormBuilder, private rutaId: ActivatedRoute, private GruposServices: SharehubApiService) {
        this.formGrupos = this.fb.group({
            nombreGrupo: ['', [Validators.required]],
            descripcionGrupo: [''],
            imgGrupo: [''],
        });

        this.idGrupoUrl = this.rutaId.snapshot.paramMap.get('idGrupo');
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
        console.log('Entro en actualizar');
        this.GruposServices.putGrupo(
            this.inputHiddenID.value,
            this.formGrupos.value
        ).subscribe((respuestaAPI) => {
            Swal.fire({
                title: 'Grupo actualizado correctamente!',
                icon: 'success',
            });
        });
        // this.consultarProductos()
        // setTimeout(() => {
        //     location.reload();
        // }, 2000);
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
                    imgGrupo: dataGrupo.imgGrupo,
                });
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
