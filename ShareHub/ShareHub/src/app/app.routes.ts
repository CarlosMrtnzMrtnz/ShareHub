import { Routes } from '@angular/router';
import { InicioComponent} from '../app/components/inicio/inicio.component'
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:'',title:"Inicio",component:LoginComponent}
];
