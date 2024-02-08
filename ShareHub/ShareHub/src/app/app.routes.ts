import { Routes } from '@angular/router';
import { InicioComponent} from '../app/component/inicio/inicio.component'
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
    {path:'',title:"Inicio",component:LoginComponent}
];
