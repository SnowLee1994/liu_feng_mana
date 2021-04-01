import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Httpbase} from '../../../shared/service/httpbase';
import {RouterService} from '../../../shared/service/router.service';
import {RETURN} from '../../../shared/utils/return.util';
import {URL} from '../../../shared/const/url.const';
import {ROUTE} from '../../../shared/const/route.enum';
import {USER} from '../../../global.const';
import {NEXT} from '../../../shared/utils/next.util';
import {HttpNext} from '../../../shared/entity/httpNext';
import {userDataBo} from '../../../shared/entity/user-data.bo';

@Injectable({
    providedIn: 'root'
})
/**
 *  用户操作服务类
 */
export class UserService extends Httpbase {

    constructor(public httpClient: HttpClient,
                private routerSV: RouterService,
    ) {
        super(httpClient);
    }

    /**
     *  用户登录操作
     * @param:  {loginInfo} 用户名、密码等信息对象
     * @return:  Observable<CheckBo>
     */
    doLogin(loginInfo: any): Observable<HttpNext<any>> {
        return new Observable<any>(o => {
            this.post(URL.do_login, loginInfo).subscribe(r => {
                NEXT.data(o, r);
            });
        });
    }

  /**
   * 用户注册
   * @param userInfo
   */
  register(userInfo: any): Observable<HttpNext<any>> {
      return new Observable<any>(o => {
        this.post(URL.register, userInfo).subscribe(r => {
          NEXT.data(o, r);
        });
      });
    }

  /**
   * 查询用户列表
   * @param query
   */
  findUsers(query: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.user_find_users, query).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }

  findUsersByPage(query: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.user_find_users_page, query).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }

  /**
   * 根据ID查询用户
   * @param query
   */
  findUserById(query: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.user_find_by_id, query).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }

  addUser(userInfo: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.user_add, userInfo).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }

  updateUser(userInfo: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.user_update, userInfo).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }

  deleteUser(userInfo: any): Observable<HttpNext<any>> {
    return new Observable<any>(o => {
      this.post(URL.user_delete, userInfo).subscribe(r => {
        NEXT.data(o, r);
      });
    });
  }

    /**
     *  通过token获取用户信息
     * @return:  Observable<CheckBo>
     */
    getUserInfoByToken(): Observable<boolean> {
        return new Observable<any>(o => {
            this.get(URL.get_user_info + USER.id).subscribe(r => {
                if (RETURN.isSucceed(r)) {
                    // 保存用户信息
                    this.initUserInfo(r.data);
                    o.next(true);
                    // NEXT.trueOrFalse(r);
                } else {
                    o.next(false);
                }
            });
        });
    }

    /**
     *  用户退出
     */
    loginOut() {
        // this.routerSV.to(ROUTE.login);
    }

    initUserInfo(userInfo: any) {
        for (let propertyName in userInfo) {
            USER[propertyName] = userInfo[propertyName];
        }
        USER['username'] = userInfo['loginName'];
        USER['id'] = userInfo['empNo'];
    }
}

