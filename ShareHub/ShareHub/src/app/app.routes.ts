import { Routes } from '@angular/router';
import { InicioComponent} from '../app/components/inicio/inicio.component'
import { PerfilComponent } from './components/perfil/perfil.component'

export const routes: Routes = [
    {path:'',title:"Inicio",component:InicioComponent},
    {path: 'perfil', title: "Perfil | ShareHub", component:PerfilComponent}
];
