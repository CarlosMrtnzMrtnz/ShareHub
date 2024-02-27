import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';

@Injectable({
    providedIn: 'root',
})
export class SharehubApiService {
    private http = inject(HttpClient);
    private urlApi: string = 'http://localhost:4000/api';

    constructor() { }

    //   -------------------------- SERVICE GRUPOS --------------------------
    getGrupos() {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${Token}` )
        return this.http.get(this.urlApi + '/consultar-grupos', {headers});
    }

    getUnGrupo(grupoId: string | null) {
        return this.http.get(`${this.urlApi}/consultar-grupo/${grupoId}`);
    }

    postGrupo(dataGrupo: any) {
        return this.http.post(`${this.urlApi}/crear-grupo/grupo`, dataGrupo);
    }

    deleteGrupo(grupoId: string) {
        return this.http.delete(`${this.urlApi}/eliminar-grupo/${grupoId}`);
    }

    putGrupo(grupoId: string, dataGrupo: any) {
        return this.http.put(
            `${this.urlApi}/actualizar-grupo/${grupoId}`,
            dataGrupo
        );
    }

    // usuarios ---------------------------------------------------------
    getUsuario(CorreoUser: string) {

        const headers = new HttpHeaders().set('Authorization', `Bearer ${Token}` )
        return this.http.get(this.urlApi + '/consultar-grupos', {headers});
    }
    getUsuarios() {
        return this.http.get(`${this.urlApi}/consultar-usuario/`);
    }

    postusuario(datausuario: any) {
        return this.http.post(`${this.urlApi}/crear-usuario`, datausuario);
    }

    deleteUsuario(idusuario: string) {
        return this.http.delete(`${this.urlApi}/eliminar-usuario/${idusuario}`);
    }

    putUsuario(idusuario: string, dataUser: any) {
        return this.http.put(
            `${this.urlApi}/actualizar-usuario/${idusuario}`,
            dataUser
        );
    }
// ------------------------------------Servicios Publicacion---------------------
    postPublicacion(dataPublicacion: any) {
        return this.http.post(`${this.urlApi}/publicacion`, dataPublicacion);
    }


// -------------------------------------Validacion token------------------------
    estaLogueado() :boolean {
        let estado = (sessionStorage.getItem('token')) ? true : false
        return estado
    }

    postIngresoUsuario(dataLogin:any) {
        return this.http.post(`${this.urlApi}/ingreso`, dataLogin)
    }

}


