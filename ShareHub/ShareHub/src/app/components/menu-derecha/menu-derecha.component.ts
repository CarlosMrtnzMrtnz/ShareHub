import { CommonModule } from '@angular/common';
import { Component, inject, signal, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharehubApiService } from '../../services/sharehub-api.service';

@Component({
  selector: 'app-menu-derecha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
],
  templateUrl: './menu-derecha.component.html',
  styleUrl: './menu-derecha.component.css'
})
export class MenuDerechaComponent {
    userdata = signal<any>([])
    private productosServices = inject(SharehubApiService)
    @Input() nombre!: string
    @Input() imguser!: string


    ngOnInit(){
        this.productosServices.getUsuarios().subscribe({
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
