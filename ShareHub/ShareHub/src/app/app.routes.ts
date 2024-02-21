import { Routes } from '@angular/router';
import { InicioComponent } from '../app/components/inicio/inicio.component'
import { GruposComponent } from "../app/components/grupos/grupos.component";
import { ListadoGruposComponent } from "../app/components/listado-grupos/listado-grupos.component";
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component'
import { RegistroGruposComponent } from "../app/components/registro-grupos/registro-grupos.component";
import { Erro404Component } from './components/erro404/erro404.component';
import { autenticacionGuardGuard } from './guards/autenticacion.guard.guard';


const tituloPagina = "ShareHub"

let vistaUsuarioSession = ''


export const routes: Routes = [
    { path: 'inicio', title: `Inicio | ${tituloPagina}`, component: InicioComponent },
    {path:`grupos/:idGrupo`,title: `Grupos | ${tituloPagina}`,component:GruposComponent},
    {path:'mis-grupos', title: `Mis grupos | ${tituloPagina}`, component:ListadoGruposComponent},
    { path: 'perfil', canMatch: [autenticacionGuardGuard], title: `Perfil | ${tituloPagina}`, component: PerfilComponent },
    { path: '', title: "login", component: LoginComponent },
    { path: 'inicio', title: "Inicio de sesion", component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'registro-grupos', canMatch: [autenticacionGuardGuard], title: `Registro Grupos | ${tituloPagina}`, component: RegistroGruposComponent },
    { path: '404', title: `error 404 | ${tituloPagina}`, component: Erro404Component },
    // ----------------------------ultima ruta---------------------------------------
    { path: '**', pathMatch: 'full', redirectTo: "404" }
];
