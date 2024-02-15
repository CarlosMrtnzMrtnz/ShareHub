import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    ingreso: FormGroup;

    constructor(private router: Router, private fb: FormBuilder){

        this.ingreso = this.fb.group({
            contrasena:["",[Validators.required,Validators.minLength(6)]],
            usuario:["",[Validators.required,Validators.minLength(6)]]

        })
    }
    ingresar(){
        console.log(this.ingreso);
    }


    ngOnInit(){
        if(sessionStorage.getItem("login") == '1'){
            this.router.navigate(['/inicio'])
        }

    }
}

