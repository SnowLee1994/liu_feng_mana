/**
 *  字符串操作工具类
 */
export class StringUtil {

  /**
   *  判断某字符串中是否包含某字符
   * @param:  {source} 需要判断的字符串
   * @param: {str} 判断的字符串
   * @return:
   */
  static isInclude(source: string, str: string): boolean {
    return source.indexOf(str) !== -1;
  }

  /**
   *  判断一个数组string【string【xx,xx】】中所有素组数组对象的前一个元素是否和后一个元素匹配
   * @param:  {handleArray} 处理的数组
   * @return: boolean
   */
  static isIncludeArr(handleArray: Array<any>) {
    let include = false;
    handleArray.forEach(r => {
      if (this.isInclude(r[0], r[1])) {
        include = true;
      }
    });
    return include;
  }

}
