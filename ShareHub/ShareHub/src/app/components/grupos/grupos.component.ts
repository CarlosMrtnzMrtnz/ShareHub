import { Component, inject, signal } from '@angular/core';
import { SharehubApiService } from '../../services/sharehub-api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
    formGrupos: FormGroup;
    private GruposServices = inject(SharehubApiService);
    listadoDeGrupos = signal<any>([]);

    constructor(private fb: FormBuilder) {
        this.formGrupos = this.fb.group({
            nombreGrupo: ['', [Validators.required]],
            descripcionGrupo: [''],
            imgGrupo: [''],
        });
    }

    ngOnInit(): void {
        // this.consultarGrupos();
        console.log('Se inicio el componente');
    }

    // consultarGrupos() {
    //     this.GruposServices.getGrupos().subscribe({
    //         next: (grupos) => {
    //             console.log(grupos);
    //             this.listadoDeGrupos.set(grupos);
    //         },
    //         error: (err) => {
    //             console.log(err);
    //         },
    //     });
    // }

    actualizarGrupo(grupoId: string) {
        this.GruposServices.getUnGrupo(grupoId).subscribe({
            next: (grupo) => {
                let dataGrupo: any = grupo

                if (dataGrupo.nombreGrupo == null) {
                    dataGrupo.nombreGrupo = ""
                }
                if (dataGrupo.descripcionGrupo == null) {
                    dataGrupo.descripcionGrupo = ""
                }
                if (dataGrupo.imgGrupo == null) {
                    dataGrupo.imgGrupo = ""
                }

                this.formGrupos.setValue({
                    nombreGrupo: dataGrupo.nombreGrupo,
                    descripcionGrupo: dataGrupo.descripcionGrupo,
                    imgGrupo: dataGrupo.imgGrupo,
                })
            },
            error: (err) => {
                console.log(err);
            }
        })
    }


}
