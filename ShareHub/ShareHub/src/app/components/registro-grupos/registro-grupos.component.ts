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

    constructor(private fb: FormBuilder) {
        this.formGrupos = this.fb.group({
            nombreGrupo: ['', [Validators.required]],
            descripcionGrupo: [''],
            imgGrupo: ['']
        });
    }

    submitForm() {
            this.GruposServices.postGrupo(this.formGrupos.value).subscribe(respuestaAPI => {
                Swal.fire({
                    title: "Grupo creado correctamente!",
                    icon: "success"
                });
                console.log(respuestaAPI)
            })
        }
    }

