import request from "@/utils/request.js";

// 账号登录
export const userLogins = (data) =>
  request({
    url: `/as/accounts/admin/login`,
    method: "post",
    data,
    withCredentials: true
  });
// 获取用户信息
export const getUserInfo = (params) =>
  request({
    url: `/us/users/me`,
    method: "get",
    params,
  });

  // 获取用户列表
export const getUsers = (params) =>
request({
  url: `/us/users/page`,
  method: "get",
  params,
});

// 查询指定当前用户信息
export const queryUserById = (id) =>
  request({
    url: `/us/users/${id}`,
    method: "get"
  });

  export const pwdReset = (id) =>
  request({
    url: `/us/users/${id}/password/default`,
    method: "put",
  });
// 启用禁用,修改用户状态
export const usersStatus = (params) =>
  request({
    url: `/us/users/${params.id}/status/${params.status}`,
    method: "put",
  });
  // 新增用户
export const saveUser = (data) =>
request({
  url: `/us/users`,
  method: "post",
  data
});
// 修改用户
export const editUser = (data) =>
request({
  url: `/us/users/${data.id}`,
  method: "put",
  data
});

//新增考勤
export const saveDaily = (data) =>
request({
 
});
// 修改考勤
export const editDaily = (data) =>
request({
 
});