/**
 * RETURN返回常用的写法集合
 */
import {APP} from '../../global.const';

export class RETURN {
  code: string;
  private static succeedCode = APP.succeedCode;

  static isSucceed(res): boolean {
    return res && res.code && res.code == this.succeedCode;
  }

  static isTrue(res): boolean {
    return res === true;
  }

  static hasData(r): boolean {
    return r != undefined && r != 0;
  }

  static notData(r: any) {
    return r === 0;
  }

  static networkError(r: any) {
    return r.hasError == true;
  }
}
