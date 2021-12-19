/**
 *  服务端api接口地址常量
 */
export const URL = {
  do_login: 'login',
  register: 'regist',
  get_user_info: 'gjmes/findUserInfo.do?empNo=',

  //用户管理
  user_find_users: 'user/userList',
  user_find_users_page: 'user/userListByPage',
  user_add: 'user/add',
  user_delete: 'user/delete',
  user_find_by_id: 'user/getUserById',
  user_update: 'user/edit',

  //角色管理
  role_find_roles_page:'role/roleListByPage',
  role_find_by_id: 'role/getRoleById',
  role_add: 'role/add',
  role_update: 'role/edit',
  role_delete: 'role/delete',

  //图片管理
  picture_find_roles_page:'picture/listByPage',
};
