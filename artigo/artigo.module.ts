import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Theme module components
import { NgaModule } from '../../theme/nga.module';

// 3° components
import { Ng2SmartTableModule } from 'ng2-smart-table';

// Components, services and routing for Artigo Module
import { ArtigoComponent } from './artigo.component';
import { routing } from './artigo.routing';

import { ArtigoListComponent } from './artigo-list/artigo-list.component';
import { ArtigoFormComponent } from './artigo-form/artigo-form.component';

import { ArtigoListService } from './artigo-list/artigo-list.service';
import { ArtigoFormService } from './artigo-form/artigo-form.service';

import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule,
        Ng2SmartTableModule,
        HttpModule,
        routing
    ],
    declarations: [
        ArtigoComponent,
        ArtigoFormComponent,
        ArtigoListComponent
    ],
    providers: [
        ArtigoListService,
        ArtigoFormService
    ],
})
export class ArtigoModule { }