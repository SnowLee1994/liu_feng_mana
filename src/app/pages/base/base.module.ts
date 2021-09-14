import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { RoleComponent } from './role/role.component';
import {UiModule} from '../../shared/ui/ui.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    BaseRoutingModule,
    UiModule,
    NgbPaginationModule,
    ReactiveFormsModule
  ]
})
export class BaseModule { }
