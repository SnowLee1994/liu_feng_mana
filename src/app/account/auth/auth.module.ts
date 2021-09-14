import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { UiModule } from '../../shared/ui/ui.module';
import { AuthRoutingModule } from './auth-routing';

import { LoginComponent } from './login/login.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';

@NgModule({
  declarations: [LoginComponent, PasswordresetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    UiModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
