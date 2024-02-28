import { CommonModule } from '@angular/common';
import { Component, inject, signal, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharehubApiService } from '../../services/sharehub-api.service';

@Component({
    selector: 'app-menu-derecha',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './menu-derecha.component.html',
    styleUrl: './menu-derecha.component.css',
})
export class MenuDerechaComponent {
    userdata = signal<any>([])
    private seviceUser = inject(SharehubApiService)
    @Input() nombre!: string
    @Input() imguser!: string

    // submitPublicacion() {
    //     if (this.formPublicaciones.valid) {
    //         const formDataPublicaciones = new FormData();
    //         formDataPublicaciones.append(
    //             'textPublicacion',
    //             this.formPublicaciones.get('textPublicacion')!.value
    //         );
    //         formDataPublicaciones.append(
    //             'imgPublicacion',
    //             this.formPublicaciones.get('imgPublicacion')!.value
    //         );
    //         formDataPublicaciones.append('idUsuario', this.idUsuarioPayload);

    ngOnInit(){
        this.seviceUser.getUsuarios().subscribe({
            next: (user) => {
                this.userdata.set(user)
                console.log(this.userdata());


            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
