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

    // usuairos ---------------------------------------------------------
    getUsuario(idProducto: string) {
        return this.http.get(`${this.urlApi}/consultar-usuario/${idProducto}`);
    }

    getCorreo(correo: string) {
        return this.http.post(`${this.urlApi}/consultar-Correo/`, { correo });
    }

    postusuario(datausuario: any) {
        return this.http.post(`${this.urlApi}/crear-usuario`, datausuario);
    }

    deleteUsuario(idusuario: string) {
        return this.http.delete(`${this.urlApi}/eliminar-usuario/${idusuario}`);
    }

    putUsuario(idProducto: string, dataProducto: any) {
        return this.http.put(
            `${this.urlApi}/actualizar-usuario/${idProducto}`,
            dataProducto
        );
    }
}
