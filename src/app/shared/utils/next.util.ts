import {result} from '../entity/result.bo';
import {RETURN} from './return.util';
import {HttpNext} from '../entity/httpNext';

/**
 *  observable返回常用的写法集合
 */
export class NEXT {
  code: string;

  static finish(observable) {
    observable.next();
    observable.complete();
  }

  static trueOrFalse(observable, res: boolean) {
    if (res) {
      observable.next(true);
    } else {
      observable.next(false);
    }
    observable.complete();
  }

  static result(observable, res: result) {
    if (RETURN.isSucceed(res)) {
      observable.next(res);
    } else if (!res.hasError) {
      observable.next(0);
    }
    observable.complete();
  }

  static data(observable, res: result) {
    if (RETURN.isSucceed(res) && res.data) {
      observable.next(this.nextObj(true, res.data));
    } else if (!res.hasError) {
      observable.next(this.nextObj(false, null, res.message ? res.message : ''));
    }
    observable.complete();
  }

  static dataOrError(observable, res: result) {
    if (RETURN.isSucceed(res) && res.data) {
      observable.next(this.nextObj(true, res.data));
    } else if (res.hasError) {
      observable.next(res);
    } else {
      observable.next(0);
    }
    observable.complete();
  }

  static message(observable, r: result) {
    if (RETURN.isSucceed(r)) {
      observable.next(this.nextObj(true, r.data));
    } else if (!r.hasError && r.message) {
      observable.next(this.nextObj(false, null, r.message ? r.message : ''));
    }
    observable.complete();
  }

  static codeOrMsg(observable, r: result) {
    if (RETURN.isSucceed(r)) {
      observable.next();
    } else if (!r.hasError && r.message) {
      observable.next(r);
    }
    observable.complete();
  }

  /**
   * 统一的返回格式
   */
  static nextObj(succeed: boolean, data: any, msg?: string) {
    return {
      success: succeed,
      data: data,
      msg: msg
    } as HttpNext<any>;
  }
}
