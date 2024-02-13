import { Routes } from '@angular/router';
import { InicioComponent} from '../app/components/inicio/inicio.component'
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
    {path:'',title:"Inicio",component:InicioComponent},
    {path:'registro',title:"registro",component:RegistroComponent}
];
