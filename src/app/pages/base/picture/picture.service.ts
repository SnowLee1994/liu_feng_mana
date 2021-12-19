import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpNext} from '../../../shared/entity/httpNext';
import {URL} from '../../../shared/const/url.const';
import {NEXT} from '../../../shared/utils/next.util';
import {Httpbase} from '../../../shared/service/httpbase';

@Injectable({
  providedIn: 'root'
})
export class PictureService extends Httpbase{

  constructor(public httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  findPicturesByPage(query: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.picture_find_roles_page, query).subscribe(r => {
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
