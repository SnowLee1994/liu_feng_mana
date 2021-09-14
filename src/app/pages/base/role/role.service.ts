import { Injectable } from '@angular/core';
import {Httpbase} from '../../../shared/service/httpbase';
import {HttpClient} from '@angular/common/http';
import {RouterService} from '../../../shared/service/router.service';
import {Observable} from 'rxjs';
import {HttpNext} from '../../../shared/entity/httpNext';
import {URL} from '../../../shared/const/url.const';
import {NEXT} from '../../../shared/utils/next.util';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends Httpbase{

  constructor(public httpClient: HttpClient,
              private routerSV: RouterService,
  ) {
    super(httpClient);
  }

  findRolesByPage(query: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.role_find_roles_page, query).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }

  findRoleById(query: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.role_find_by_id, query).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }

  addRole(roleInfo: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.role_add, roleInfo).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }

  updateRole(roleInfo: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.role_update, roleInfo).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }

  deleteRole(data: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.role_delete, data).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }
}
