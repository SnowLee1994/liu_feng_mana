import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user/user.component';
import {RoleComponent} from './role/role.component';
import {PictureComponent} from './picture/picture.component';


const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'user', component: UserComponent },
  { path: 'role', component: RoleComponent },
  { path: 'picture', component: PictureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
