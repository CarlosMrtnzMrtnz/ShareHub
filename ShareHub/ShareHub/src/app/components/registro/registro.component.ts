import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharehubApiService } from '../../services/sharehub-api.service';
import Swal from 'sweetalert2';

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
    regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    constructor(private router: Router, private fb: FormBuilder) {
        this.formregistro = this.fb.group({
            nombreuser: ['', [Validators.required]],
            CorreoUser: ['' ,[Validators.required]],
            clave: ['', [Validators.required]],
            imguser:[''],
            descripcionuser:['']

        })
    }
    ngOnInit() {

        if (sessionStorage.getItem("login") == '1') {
            this.router.navigate(['/inicio'])
        }
    }




    submitForm() {
        console.log("lachupa");

        this.registroService.postusuario(this.formregistro.value).subscribe(respuestaAPI => {
            Swal.fire({
                title: "Producto agregado correctamente! 😁",
                icon: "success"
            });
            console.log(respuestaAPI);

        })

    }
}

