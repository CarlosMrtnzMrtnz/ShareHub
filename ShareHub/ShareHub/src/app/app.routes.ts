import { Routes } from '@angular/router';
import { InicioComponent} from '../app/components/inicio/inicio.component'
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:'',title:"Inicio de sesion",component:LoginComponent},
    {path:'inicio',title:"Inicio de sesion",component:InicioComponent},
    {path: 'registro', component: RegistroComponent }
];
