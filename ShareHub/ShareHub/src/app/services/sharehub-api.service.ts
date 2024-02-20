import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SharehubApiService {
    private http = inject(HttpClient);
    private urlApi: string = 'http://localhost:4000/api';

    constructor() {}

    //   -------------------------- SERVICE GRUPOS --------------------------
    getGrupos() {
        return this.http.get(this.urlApi + '/consultar-grupos');
    }

    getUnGrupo(grupoId: string) {
        return this.http.get(`${this.urlApi}/consultar-grupo${grupoId}`);
    }

    postGrupo(dataGrupo: any) {
        return this.http.post(`${this.urlApi}/crear-grupo`, dataGrupo);
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
        return this.http.get(`${this.urlApi}/consultar-usuario/${CorreoUser}`);
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
}
