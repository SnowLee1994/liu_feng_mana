/**
 * 内部使用的二次封装的observable返回对象
 */
export class result {
  public id?: string;
  public code: string;
  public message?: string;
  public data?: data | any;
  public hasError?: boolean;
}

/**
 *  请求结果实体
 */
export class resultObj {
  public id: string;
  public code: string;
  public msg: string;
  public data: any;
}

export class data {
  public id: string;
  public current: number;
  public orders: any[];
  public pages: number;
  public records: any[];
  public searchCount: boolean;
  public size: number;
  public total: number;
}
