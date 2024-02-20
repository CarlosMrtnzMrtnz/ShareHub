import { Component, inject, signal } from '@angular/core';
import { GruposListadoTemplateComponent } from '../templates/grupos-listado-template/grupos-listado-template.component';
import { SharehubApiService } from '../../services/sharehub-api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listado-grupos',
    standalone: true,
    imports: [GruposListadoTemplateComponent],
    templateUrl: './listado-grupos.component.html',
    styleUrl: './listado-grupos.component.css',
})
export class ListadoGruposComponent {
    gruposData = signal<any>([]);
    private GruposServices = inject(SharehubApiService);

    ngOnInit() {
        this.GruposServices.getGrupos().subscribe({
            next: (grupos) => {
                this.gruposData.set(grupos);
                console.log(this.gruposData());
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    GrupoDesdeTemplate(event: String, idGrupo: string) {
        console.log(event);
        console.log(idGrupo);
        Swal.fire({
            title: '¿Estás seguro que quieres eliminar este producto?',
            icon: 'question',
            text: 'No podras restablecer el grupo eliminado',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                this.GruposServices.deleteGrupo(idGrupo).subscribe({
                    next: (productos) => {
                        Swal.fire({
                            title: 'Producto eliminado correctamente!',
                            icon: 'success',
                        });
                        setTimeout(() => {
                            location.reload()
                        }, 1500);
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
            }
        });
    }
}
