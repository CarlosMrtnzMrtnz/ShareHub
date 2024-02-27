import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SharehubApiService {
    private http = inject(HttpClient);
    private urlApi: string = 'http://localhost:4000/api';

    constructor() { }

    //   -------------------------- SERVICE GRUPOS --------------------------
    getGrupos() {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)
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
            `${this.urlApi}/actualizar-grupo/${grupoId}/grupo`,
            dataGrupo
        );
    }

    postMiembroGrupo(idGrupoUrl: string | null, value: any) {
        throw new Error('Method not implemented.');
    }

    // usuarios ---------------------------------------------------------
    getUsuario(CorreoUser: string) {
        return this.http.get(`${this.urlApi}/consultar-usuario/${CorreoUser}`);
    }
    getUsuarios() {
        const headers = new HttpHeaders().set('Authorization',  `Bearer ${sessionStorage.getItem('token')}`)
        return this.http.get(`${this.urlApi}/consultar-usuarios`, {headers});
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

    postDesencriptarPayload(token:string | null) : any{
        if(token != null){
            const headers = new HttpHeaders().set('Authorization', `Beares ${token}`)
            return this.http.get(this.urlApi + '/token-info', {headers});
        }else{
            return {msg: 'sin token'}
        }
    }
// ------------------------------------Servicios Publicacion---------------------
    postPublicacion(dataPublicacion: any) {
        return this.http.post(`${this.urlApi}/crear-publicacion/publicacion`, dataPublicacion);
    }

    deletePublicacion(publicacionId:string) {
        return this.http.delete(`${this.urlApi}/eliminar-publicacion/${publicacionId}`)
    }

    getPublicaciones() {
        const headers = new HttpHeaders().set('Authorization', 'Beares eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2ZhYjhjZmYzMzE4OTA3ZTRiZDJiOCIsImlhdCI6MTcwODEwOTgyNywiZXhwIjoxNzA4MTEzNDI3fQ.hiFhddu3erEOeEDPK_VoIBKYdWBonV-KbCV5XXHzJDI')
        return this.http.get(this.urlApi + '/consultar-publicaciones', {headers});
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


