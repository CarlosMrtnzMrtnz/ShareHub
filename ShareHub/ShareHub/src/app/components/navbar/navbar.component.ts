import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharehubApiService } from '../../services/sharehub-api.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    private publicacionesServices = inject(SharehubApiService);

    URLProyecto = "//" + location.hostname + ":" + location.port
    idUsuarioPayload: any
    constructor(private router: Router) { }

    ngOnInit() {
        let tokenSession = sessionStorage.getItem('token');
        this.publicacionesServices
            .postDesencriptarPayload(tokenSession)
            .subscribe((respuestaApi: any) => {
                console.log(respuestaApi);
                this.idUsuarioPayload = respuestaApi.id;
                // this.router.navigate([`/mi-perfil/${this.idUsuarioPayload}`])
            });
    }

    clearSessionStorage() {
        sessionStorage.clear();
        location.reload()
    }


}
