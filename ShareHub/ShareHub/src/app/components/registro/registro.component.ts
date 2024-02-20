import { Component, inject,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharehubApiService } from '../../services/sharehub-api.service';
import Swal from 'sweetalert2';
import { filter } from 'rxjs';




@Component({
    selector: 'app-registro',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './registro.component.html',
    styleUrl: './registro.component.css'
})
export class RegistroComponent {
    formregistro: FormGroup;
    private registroService = inject(SharehubApiService)
    regexEmail = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
    regexAlfabetico = /^[A-Za-z ]+$/

    constructor(private router: Router, private fb: FormBuilder) {
        this.formregistro = this.fb.group({
            nombre: ['', [Validators.required, Validators.pattern(this.regexAlfabetico)]],
            CorreoUser: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
            clave: ['', [Validators.required]],
            imguser:[''],
            descripcionuser:['']

        })
    }

    productosData = signal<any>([])
    private productosServices = inject(SharehubApiService)

    ngOnInit() {

        if (sessionStorage.getItem("login") == '1') {
            this.router.navigate(['/inicio'])
        };

    }






    submitForm() {
        console.log('esta');
        this.productosServices.getUsuarios().subscribe({
            next: (dataUsers) => {
                this.productosData.set(dataUsers)
                console.log(dataUsers);
        this.registroService.postusuario(this.formregistro.value).subscribe(respuestaAPI => {

            Swal.fire({
                title: "Usuario Agregado! 😁",
                icon: "success"
            });
            console.log(respuestaAPI);
        })


            },
            error: (err) => {
                console.log(err);
            }
        })

    }
}
