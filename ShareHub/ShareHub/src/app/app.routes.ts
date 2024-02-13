import { Routes } from '@angular/router';
import { InicioComponent} from '../app/components/inicio/inicio.component'
import { GruposComponent } from "../app/components/grupos/grupos.component";
import { PerfilComponent } from "../app/components/perfil/perfil.component";
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

const tituloPagina = "ShareHub"
export const routes: Routes = [
    {path:'',title: `Inicio | ${tituloPagina}`,component:InicioComponent},
    {path:'grupos',title: `Grupos | ${tituloPagina}`,component:GruposComponent},
    {path:'perfil',title: `Perfil | ${tituloPagina}`,component:PerfilComponent},
    {path:'',title:"Inicio de sesion",component:LoginComponent},
    {path:'inicio',title:"Inicio de sesion",component:InicioComponent},
    {path: 'registro', component: RegistroComponent }
];
