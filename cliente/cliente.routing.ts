import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente.component';
import { ClienteList } from './components/clienteList/clienteList.component';
import { ClienteForm } from './components/clienteForm/clienteForm.component';



const routes: Routes = [
    {
        path: '',
        component: ClienteComponent,
        children: [
            { path: '', component: ClienteList },
            { path: 'clienteList/:option', component: ClienteList },
            { path: 'clienteForm', component: ClienteForm },
            { path: 'clienteForm/:id', component: ClienteForm }
        ]

    }
];

export const routing = RouterModule.forChild(routes);
