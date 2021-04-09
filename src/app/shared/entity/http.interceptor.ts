import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, retry, timeout} from 'rxjs/operators';
import {RouterService} from '../service/router.service';
import {UserService} from '../../pages/base/user/user.service';
import {USER} from '../../global.const';

@Injectable({providedIn: 'root'})
export class HttpInterceptor {
    private _networkErrorOnShow: boolean = false;//  网络错误
    constructor(
        private routerSV: RouterService,
        private userSV: UserService,
    ) {
    }

    /**
     * @Description: 统一全局的http拦截过滤操作
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 加入token信息
        req = req.clone({headers: req.headers.set('Authorization', USER.token)});
        //  自定义的错误相应对象
        let errorRespone = new HttpResponse({status: 200, body: {hasError: true}});
        // 响应处理
        return next.handle(req).pipe(
            timeout(20000),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body.code && event.body.code == 7) {
                        alert('访问已过期');
                        // 访问过期了就导航到登录页
                        setTimeout(_ => {
                            this.userSV.loginOut();
                        }, 1500);
                        return errorRespone;
                    } else {
                        return event;
                    }
                } else {
                    return event;
                }
            }),
            retry(1),
            catchError((error: HttpErrorResponse) => {
                this.networkErrorToast();
                return of(errorRespone);
            })
        );
    }


    /**
     *  控制toast提示的出现频率，实现多次http请求，能友好而不频繁地提示网络相关问题
     */
    networkErrorToast() {
        if (!this._networkErrorOnShow) {
            this._networkErrorOnShow = true;
            alert('网络错误');
            setTimeout(_ => {
                this._networkErrorOnShow = false;
            }, 3000);
        }
    }
}
