import { Component, inject, signal } from '@angular/core';
import { SharehubApiService } from '../../services/sharehub-api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    idGrupoUrl: null | string;

    nombreGrupo: string = '';
    descripcionGrupo: string = '';
    imgGrupo: string = '';

    constructor(private fb: FormBuilder, private rutaId: ActivatedRoute) {
        this.formGrupos = this.fb.group({
            nombreGrupo: ['', [Validators.required]],
            descripcionGrupo: [''],
            imgGrupo: [''],
        });

        this.idGrupoUrl = this.rutaId.snapshot.paramMap.get('idGrupo');
    }

    ngOnInit(): void {
        console.log('Se inicio el componente');
    }


    // actualizarGrupo(grupoId: string) {
    //     this.GruposServices.getUnGrupo(grupoId).subscribe({
    //         next: (grupo) => {
    //             let dataGrupo: any = grupo

    //             if (dataGrupo.nombreGrupo == null) {
    //                 dataGrupo.nombreGrupo = ""
    //             }
    //             if (dataGrupo.descripcionGrupo == null) {
    //                 dataGrupo.descripcionGrupo = ""
    //             }
    //             if (dataGrupo.imgGrupo == null) {
    //                 dataGrupo.imgGrupo = ""
    //             }

    //             this.formGrupos.setValue({
    //                 nombreGrupo: dataGrupo.nombreGrupo,
    //                 descripcionGrupo: dataGrupo.descripcionGrupo,
    //                 imgGrupo: dataGrupo.imgGrupo,
    //             })
    //         },
    //         error: (err) => {
    //             console.log(err);
    //         }
    //     })
    // }


}
