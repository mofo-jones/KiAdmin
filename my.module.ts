import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './my.routing';
import { NgaModule } from '../theme/nga.module';

import { My } from './my.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [My]
})
export class MyModule {
}
