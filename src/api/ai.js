// AI的请求方法全部单独定义，不使用request.js中的内容
import axios from "axios";
import {AI_TOKEN} from "../config/global";

const CODE = {

    REQUEST_SUCCESS: 200,

  };

const instance = axios.create({
    baseURL: '/api',
    // timeout: 1000,
    withCredentials: false
  })

  instance.interceptors.request.use((config) => {
    const TOKEN = AI_TOKEN
    config.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': TOKEN,
    }
    return config
  })

  instance.interceptors.response.use(
    async (response) => {
      // 1.获取业务状态码
      let code = response.data.code;
      // 2.业务状态码为200，直接返回
      if (code === CODE.REQUEST_SUCCESS) {
        return response.data;
      }
      return response.data;
      /*    // 4.业务状态码为其它，返回异常
          ElMessage({
            message: response.data.msg,
            type: 'error'
          });
          throw new Error(response.data.msg);*/
    },
    async (err) => {
      
      // refreshing = false;
      return Promise.reject(err);
    },
  );


export const getAnswer = (data) =>
instance({
  url: `/v2/app/completions`,
  method: "post",
  data,
});

