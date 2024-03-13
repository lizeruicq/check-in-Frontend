import request from "@/utils/request.js";
//新增考勤
export const saveDaily = (data) =>
request({
    url:'/ds/daily/',
    method:"post",
    data
});
// 修改考勤
export const editDaily = (data) =>
request({
  url: `/ds/daily/${data.id}`,
  method: "put",
  data
   
});

export const getDailies = (params) =>
request({
    url:'/ds/daily/page',
    method:"get",
    params
});

export const getPersonlength = (params) =>
request({
    url:'/ds/daily-detail/personlength',
    method:"get",
    params
});

export const queryDailyById = (id)=>
request(
    {
        url:`/ds/daily/${id}`,
        method:"get",
    }
)