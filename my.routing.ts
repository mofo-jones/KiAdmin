import { Routes, RouterModule } from '@angular/router';
import { My } from './my.component';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './login/guards/index';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
    //  {
    //    path: 'login',
    //    loadChildren: 'app/my/login/login.module#LoginModule'
    //  },
    //  {
    //    path: 'register',
    //    loadChildren: 'app/my/register/register.module#RegisterModule'
    //  },
    {
        path: 'my',
        component: My,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: 'app/my/dashboard/dashboard.module#DashboardModule' },
            { path: 'artigo', loadChildren: 'app/my/artigo/artigo.module#ArtigoModule' },
            //      { path: 'editors', loadChildren: 'app/my/editors/editors.module#EditorsModule' },
            //      { path: 'components', loadChildren: 'app/my/components/components.module#ComponentsModule' },
            //      { path: 'charts', loadChildren: 'app/my/charts/charts.module#ChartsModule' },
            //      { path: 'ui', loadChildren: 'app/my/ui/ui.module#UiModule' },
            //      { path: 'forms', loadChildren: 'app/my/forms/forms.module#FormsModule' },
            //      { path: 'tables', loadChildren: 'app/my/tables/tables.module#TablesModule' },
            //      { path: 'maps', loadChildren: 'app/my/maps/maps.module#MapsModule' }
        ]
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
