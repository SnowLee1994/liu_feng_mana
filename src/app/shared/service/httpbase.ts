import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {result, resultObj} from '../entity/result.bo';
import {APP} from '../../global.const';

/**
 * http网络请求的基础类
 */
export class Httpbase {
  // crossDomain = 'cross';
  crossDomain = '';

  constructor(public httpClient: HttpClient) {
  }

  /**
   * post请求
   * @param: {url} 请求地址
   * @param: {queryObj} 请求body
   * @return: Observable<result>
   */
  post(url: string, queryObj?: any): Observable<result> {
    return this.httpClient.post<result>(APP.fullURL(url), new HttpParams({fromObject: queryObj}));
  }

  /**
   * post请求
   * @param: {url} 请求地址
   * @param: {queryObj} 请求body
   * @return: Observable<result>
   */
  postJson(url: string, queryObj: any): Observable<result> {
    let httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.httpClient.post<result>('https://tcmp.twsz.com/' + url, queryObj, httpOptions);
  }

  /**
   * get请求
   * @param: {url} 请求地址
   * @param: {...params} 请求参数
   * @return: Observable<result>
   */
  get(url: string, ...params): Observable<result> {
    if (params) {
      url = Httpbase.processiongParams(url, ...params);
    }
    return this.httpClient.get<resultObj>(APP.fullURL(url));
  }

  /**
   * 把网址常量中的下划线替换成参数
   * @param: {url} 要替换的参数
   * @param: {...params} 参数裂变
   * @return: string
   */
  private static processiongParams(url, ...params): string {
    params.forEach(r => {
      url = url.replace('_', r);
    });
    return url;
  }

}
