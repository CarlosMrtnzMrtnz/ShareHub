import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SharehubApiService } from "../../../services/sharehub-api.service";
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-grupos-listado-template',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './grupos-listado-template.component.html',
    styleUrl: './grupos-listado-template.component.css',
})
export class GruposListadoTemplateComponent {
    private GruposServices = inject(SharehubApiService);
    @Input() nombreGrupo!: string;
    @Input() imgGrupo!: string;

    @Output() dataGrupoTemplate = new EventEmitter();

    eliminarGrupo(idGrupo: string = "") {
        let dataGrupo = {
            nombreGrupo: this.nombreGrupo,
            imgGrupo: this.imgGrupo,
        };
        this.dataGrupoTemplate.emit(dataGrupo);
        console.log(dataGrupo)

    }
}
