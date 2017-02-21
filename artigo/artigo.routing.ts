import { Routes, RouterModule } from '@angular/router';

import { ArtigoComponent } from './artigo.component';
import { ArtigoListComponent } from './artigo-list/artigo-list.component';
import { ArtigoFormComponent } from './artigo-form/artigo-form.component';

const routes: Routes = [
    {
        path: '',
        component: ArtigoComponent,
        children: [
            { path: 'artigo-list', component: ArtigoListComponent },
            { path: 'artigo-list/:option', component: ArtigoListComponent },
            { path: 'artigo-form', component: ArtigoFormComponent },
            { path: 'artigo-form/:id', component: ArtigoFormComponent }
        ]

    }
];

export const routing = RouterModule.forChild(routes);
