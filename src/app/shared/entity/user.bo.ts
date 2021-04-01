export class User {
  private _id: string;               // 工号
  private _token: string;            // token信息
  private _avatar: string;           // 头像
  private _phone: string;            // 电话
  private _email: string;            // 邮件
  private _photo_addr: string;       // 头像地址
  private _role: string;             // 角色
  private _username: string;             // 用户名
  private _password: string;         // 密码


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get photo_addr(): string {
    return this._photo_addr;
  }

  set photo_addr(value: string) {
    this._photo_addr = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
