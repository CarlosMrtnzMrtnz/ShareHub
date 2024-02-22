import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { SharehubApiService } from '../../services/sharehub-api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-registro-grupos',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './registro-grupos.component.html',
    styleUrl: './registro-grupos.component.css',
})
export class RegistroGruposComponent {
    formGrupos: FormGroup;
    private GruposServices = inject(SharehubApiService);
    inputFile!:any
    archivo:any

    constructor(private fb: FormBuilder) {
        this.formGrupos = this.fb.group({
            nombreGrupo: ['', [Validators.required]],
            descripcionGrupo: [''],
            imgGrupo: [''],
        });
    }

    agregarImagenArr(event:any){
        if(event.target.files.length > 0){
            const archivoGrupo = event.target.files[0]
            this.formGrupos.get("imgGrupo")!.setValue(archivoGrupo)
        }
    }

    submitForm() {
        if (this.formGrupos.valid) {
            const formDataGrupos = new FormData();
            formDataGrupos.append('nombreGrupo', this.formGrupos.get('nombreGrupo')!.value);
            formDataGrupos.append('descripcionGrupo', this.formGrupos.get('descripcionGrupo')!.value);
            formDataGrupos.append('imgGrupo', this.formGrupos.get('imgGrupo')!.value);

            this.GruposServices.postGrupo(formDataGrupos).subscribe(
                (respuestaAPI) => {
                    Swal.fire({
                        title: 'Grupo creado correctamente!',
                        icon: 'success',
                    });
                    console.log(respuestaAPI);
                }
            );
        } else {
            Swal.fire({
                title: 'Error',
                text: 'por favor ingresa los datos requeridos para crear un grupo',
                icon: 'error',
            });
        }
    }

}
